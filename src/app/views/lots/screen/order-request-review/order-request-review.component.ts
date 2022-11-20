import {Component, Input, OnInit} from '@angular/core';
import {CreateUpdateOrderRequestDto} from "../../model/create-update-order-request-dto.model";
import {OrderRequest} from "../../model/order-request.model";

@Component({
  selector: 'app-order-request-review',
  templateUrl: './order-request-review.component.html',
  styleUrls: ['./order-request-review.component.scss']
})
export class OrderRequestReviewComponent implements OnInit {

  @Input() orderRequest: OrderRequest = OrderRequest.fromObject({} as OrderRequest);

  constructor() {
  }

  ngOnInit(): void {
  }

}
