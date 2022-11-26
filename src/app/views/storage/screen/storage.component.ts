import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/storage/product.service";
import {ProductNameService} from "../../../services/storage/product-name.service";
import {AuthService} from "../../../shared/services/auth.service";
import {catchError, finalize, map, Observer, of, switchMap, throwError} from "rxjs";
import {JwtUser} from "../../../shared/entities/user/jwt-user.model";
import {FormUtil} from "../../../utils/form.util";
import {Product} from "../model/product.model";
import {Page} from "../../../shared/entities/api/page.model";
import {environment} from "../../../../environments/environment";
import {DialogService} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../shared/services/dynamic-alert.service";
import {UpdateProductComponent} from "./dialog/update-product/update-product.component";
import {SpinnerService} from "../../../services/shared/spinner.service";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit, AfterViewInit {

  public user: JwtUser = JwtUser.fromObject({} as JwtUser);
  public page: Page<Product> | undefined;
  public selectedProducts: Product[] = [];
  public selectAll: boolean;
  public loading: boolean = false;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly spinnerService: SpinnerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.selectAll = false;
    this.user = this.authService.getSafeUser();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public loadProducts(config: { first: number, rows: number }): void {
    const page: number = config.first / (config.rows || 1);
    this.getProducts({ page, owner: this.user.id });
  }

  public addProduct(): void {
    this.openProductModal(Product.fromObject({} as Product), false);
  }

  public updateProduct(product: Product): void {
    this.openProductModal(product, true);
  }

  public removeProduct(id: number): void {
    this.spinnerService.show();
    const observer: Observer<void> = {
      next: this.loadProducts.bind(this, { first: 0, rows: 0}),
      error: () => {},
      complete: () => {}
    }
    this.productService.delete(id).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.spinnerService.hide())
    ).subscribe(observer);
  }

  private getProducts(queryParams: { [key: string]: any } = {}): void {
    this.loading = true;
    const observer: Observer<Page<Product>> = {
      next: page => this.page = page,
      error: () => {},
      complete: () => {}
    };
    this.productService.getProducts(queryParams).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.loading = false)
    ).subscribe(observer);
  }

  private openProductModal(product: Product, isUpdateWindow: boolean): void {
    const ref = this.dialogService.open(
      UpdateProductComponent,
      {
        width: '500px',
        data: { product, isUpdateWindow },
        header: `${isUpdateWindow ? 'Змінити' : 'Створити'} Продукт`
      }
    );


    ref.onClose.subscribe(response => {
      if (response) {
        this.loadProducts({ first: 0, rows: 0});
      }
    })
  }
}
