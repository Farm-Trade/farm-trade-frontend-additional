import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrderRequest} from "../../../model/order-request.model";

@Component({
  selector: 'app-review-order-request',
  templateUrl: './review-order-request.component.html',
  styleUrls: ['./review-order-request.component.scss']
})
export class ReviewOrderRequestComponent implements OnInit {

  public readonly orderRequest: OrderRequest;
  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
  ) {
    this.orderRequest = this.config.data.orderRequest;
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.ref.close();
  }
}
