import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JwtUser} from "../../../../shared/entities/user/jwt-user.model";
import {Page} from "../../../../shared/entities/api/page.model";
import {OrderRequest} from "../../model/order-request.model";
import {OrderRequestService} from "../../../../services/log/order-request.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../../shared/services/dynamic-alert.service";
import {SpinnerService} from "../../../../services/shared/spinner.service";
import {catchError, finalize, Observer, Subject, take} from "rxjs";
import {ReviewOrderRequestComponent} from "../dialog/review-order-request/review-order-request.component";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-farmer-related-lots',
  templateUrl: './farmer-related-lots.component.html',
  styleUrls: ['./farmer-related-lots.component.scss']
})
export class FarmerRelatedLotsComponent implements OnInit {

  public user: JwtUser;
  public page: Page<OrderRequest> | undefined;
  public loading: boolean = false;

  constructor(
    private readonly orderRequestService: OrderRequestService,
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly spinnerService: SpinnerService,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.user = authService.getSafeUser();
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
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
    this.orderRequestService.getFarmerRelatedOrderRequests(page).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.loading = false)
    ).subscribe(observer);
  }

  public reviewOrderRequest(orderRequest: OrderRequest): void {
    this.dialogService.open(
      ReviewOrderRequestComponent,
      {
        width: '700px',
        data: {orderRequest},
        header: 'Перегляд Лоту'
      }
    );
  }

  public updateUnitPrice(orderRequest: OrderRequest): void {
    const updater: Subject<void> = new Subject<void>();
    updater.asObservable().pipe(take(1)).subscribe(() => {
      this.spinnerService.show();
      this.orderRequestService.updateUnitPrice(orderRequest.id)
        .pipe(finalize(() => this.spinnerService.hide()))
        .subscribe(() => this.getOrderRequests(0));
    })
    const isFirstRate: boolean = !orderRequest.priceUpdateHistory.find(({ updater }) => updater.id === this.user.id);
    if (!isFirstRate) {
      updater.next();
      return;
    }
    this.confirmationService.confirm({
      message: 'Після того як хтось підвищить вашу ставку, кількісь продукту зарезервується! Всеодно зробити ставку?',
      acceptLabel: 'Так',
      rejectLabel: 'Ні',
      accept: () => updater.next()
    });
  }

  public rejectUpdateUnitPrice(orderRequest: OrderRequest): void {
    this.spinnerService.show();
    this.orderRequestService.rejectUpdateUnitPrice(orderRequest.id)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(() => this.getOrderRequests(0));
  }
}
