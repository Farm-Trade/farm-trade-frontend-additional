import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JwtUser} from "../../../shared/entities/user/jwt-user.model";
import {Page} from "../../../shared/entities/api/page.model";
import {catchError, finalize, Observer, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductNameService} from "../../../services/storage/product-name.service";
import {AuthService} from "../../../shared/services/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../shared/services/dynamic-alert.service";
import {SpinnerService} from "../../../services/shared/spinner.service";
import {OrderRequest} from "../model/order-request.model";
import {OrderRequestService} from "../../../services/log/order-request.service";
import {Product} from "../../storage/model/product.model";
import {UpdateProductComponent} from "../../storage/screen/dialog/update-product/update-product.component";
import {UpdateOrderRequestComponent} from "./dialog/update-order-request/update-order-request.component";

@Component({
  selector: 'app-order-request',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {

  public user: JwtUser = JwtUser.fromObject({} as JwtUser);
  public page: Page<OrderRequest> | undefined;
  public selectedOrderRequests: OrderRequest[] = [];
  public selectAll: boolean;
  public loading: boolean = false;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly orderRequestService: OrderRequestService,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly spinnerService: SpinnerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.selectAll = false;
    this.authService.getRightUser(this.activateRoute.params)
      .pipe(
        catchError(errorMessage => {
          this.dynamicAlertService.addErrorMessage(errorMessage);
          return throwError(() => errorMessage);
        })
      )
      .subscribe(user => this.user = user)
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public loadOrderRequests(config: { first: number, rows: number }): void {
    const page: number = config.first / (config.rows || 1);
    this.getOrderRequests({ page, owner: this.user.id })
  }

  public getOrderRequests(queryParams: { [key: string]: any } = {}): void {
    this.loading = true;
    const observer: Observer<Page<OrderRequest>> = { next: page => this.page = page, error: () => {}, complete: () => {} };
    this.orderRequestService.getOrderRequests(queryParams).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.loading = false)
    ).subscribe(observer);
  }
  public addOrderRequest(): void {
    this.openOrderRequestModal(OrderRequest.fromObject({} as OrderRequest), false);
  }

  public updateOrderRequest(orderRequest: OrderRequest): void {
    this.openOrderRequestModal(orderRequest, true);
  }

  public removeOrderRequest(id: number): void {
    this.spinnerService.show();
    const observer: Observer<void> = {
      next: () => this.loadOrderRequests({ first: 0, rows: 0}),
      error: () => {},
      complete: () => {}
    };
    this.orderRequestService.delete(id).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService))
    ).subscribe(observer);
  }

  private openOrderRequestModal(orderRequest: OrderRequest, isUpdateWindow: boolean): void {
    const ref = this.dialogService.open(
      UpdateOrderRequestComponent,
      {
        width: '700px',
        data: { orderRequest, isUpdateWindow },
        header: `${isUpdateWindow ? 'Змінити' : 'Створити'} Лот`
      }
    );


    ref.onClose.subscribe(response => {
      if (response) {
        this.loadOrderRequests({ first: 0, rows: 0});
      }
    })
  }
}
