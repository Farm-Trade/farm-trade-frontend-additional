import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JwtUser} from "../../../../shared/entities/user/jwt-user.model";
import {Page} from "../../../../shared/entities/api/page.model";
import {OrderRequest} from "../../model/order-request.model";
import {OrderRequestService} from "../../../../services/log/order-request.service";
import {DialogService} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../../shared/services/dynamic-alert.service";
import {SpinnerService} from "../../../../services/shared/spinner.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {catchError, finalize, Observer} from "rxjs";
import {ReviewOrderRequestComponent} from "../dialog/review-order-request/review-order-request.component";

@Component({
  selector: 'app-own-rated-lots',
  templateUrl: './own-rated-lots.component.html',
  styleUrls: ['./own-rated-lots.component.scss']
})
export class OwnRatedLotsComponent implements OnInit {
  public page: Page<OrderRequest> | undefined;
  public loading: boolean = false;

  constructor(
    private readonly orderRequestService: OrderRequestService,
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly spinnerService: SpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  public loadOrderRequests(config: { first: number, rows: number }): void {
    const page: number = config.first / (config.rows || 1);
    this.getOrderRequests(page)
  }

  public getOrderRequests(page: number): void {
    this.loading = true;
    const observer: Observer<Page<OrderRequest>> = {
      next: page => this.page = page, error: () => {
      }, complete: () => {
      }
    };
    this.orderRequestService.getFarmerRatedOrderRequests(page).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.loading = false)
    ).subscribe(observer);
  }

  public reviewOrderRequest(orderRequest: OrderRequest): void {
    this.dialogService.open(
      ReviewOrderRequestComponent,
      {
        width: '700px',
        data: { orderRequest },
        header: 'Перегляд Лоту'
      }
    );
  }

  public rejectUpdateUnitPrice(orderRequest: OrderRequest): void {
    this.spinnerService.show();
    this.orderRequestService.rejectUpdateUnitPrice(orderRequest.id)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(() => this.getOrderRequests(0))
  }
}
