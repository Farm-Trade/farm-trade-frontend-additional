import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/storage/product.service";
import {ProductNameService} from "../../../services/storage/product-name.service";
import {AuthService} from "../../../shared/services/auth.service";
import {finalize, map, Observer, of, switchMap, throwError} from "rxjs";
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
  public loading: boolean = false;
  public backendUrl: string;
  private readonly pageKey: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly productNameService: ProductNameService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly spinnerService: SpinnerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.pageKey = 'app-storage';
    this.backendUrl = environment.backendUrl + '/api/';
    this.dynamicAlertService.clearAlertByKey(this.pageKey);
    this.activateRoute.params.pipe(
      map(({id}) => +id),
      switchMap(id => {
        if (!FormUtil.isNumberCorrectId(id) || !this.authService.isOwnUserId(id)) {
          this.router.navigate(['/']);
          return throwError(() => "Wrong user id passed");
        }
        return this.authService.user$.pipe(
          switchMap(user => user ? of(user) : throwError(() => "User does not exists"))
        );
      })
    ).subscribe(user => this.user = user)
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  public loadProducts({ first, rows }: { first: number, rows: number }): void {
    console.log(first, rows)
    this.getProducts({ page: first / (rows || 1) })
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
      error: () => this.dynamicAlertService.pushSimpleAlert("Не вдалось видалити продукцію", this.pageKey),
      complete: () => this.spinnerService.hide()
    }
    this.productService.delete(id).subscribe(observer);
  }

  private getProducts(queryParams: { [key: string]: any } = {}): void {
    this.loading = true;
    const observer: Observer<Page<Product>> = {
      next: page => this.page = page,
      error: () => this.dynamicAlertService.pushSimpleAlert("Не вдалось завантажити продукцію", this.pageKey),
      complete: () => this.loading = false
    };
    this.productService.getProducts(queryParams).subscribe(observer);
  }

  private openProductModal(product: Product, isUpdateWindow: boolean): void {
    const ref = this.dialogService.open(
      UpdateProductComponent,
      {
        width: '500px',
        height: '450px',
        data: { product, isUpdateWindow }
      }
    );


    ref.onClose.subscribe(response => {
      if (response) {
        this.loadProducts({ first: 0, rows: 0});
      }
    })
  }
}
