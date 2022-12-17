import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrderRequest} from "../../../model/order-request.model";
import {PriceUpdateHistory} from "../../../model/price-update-history.model";
import {OrderRequestService} from "../../../../../services/log/order-request.service";
import {SpinnerService} from "../../../../../services/shared/spinner.service";
import {DynamicAlertService} from "../../../../../shared/services/dynamic-alert.service";
import {catchError, finalize} from "rxjs";

@Component({
  selector: 'app-select-winner',
  templateUrl: './select-winner.component.html',
  styleUrls: ['./select-winner.component.scss']
})
export class SelectWinnerComponent implements OnInit {

  public readonly orderRequest: OrderRequest;
  public readonly priceUpdateHistories: PriceUpdateHistory[];

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly orderRequestService: OrderRequestService,
    private readonly spinnerService: SpinnerService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.orderRequest = this.config.data;
    this.priceUpdateHistories = this.orderRequest.priceUpdateHistory
      .sort((a, b) => a.updatedTo - b.updatedTo);
  }

  public ngOnInit(): void {
  }

  public selectWinner(priceUpdateHistory: PriceUpdateHistory): void {
    this.spinnerService.show();
    this.orderRequestService.selectWinner(this.orderRequest.id, priceUpdateHistory)
      .pipe(
        catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
        finalize(this.spinnerService.hide.bind(this.spinnerService))
      )
      .subscribe(() => this.ref.close(true));
  }
}
