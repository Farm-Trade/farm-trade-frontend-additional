import {Component, Input, OnInit} from '@angular/core';
import {CreateUpdateOrderRequestDto} from "../../model/create-update-order-request-dto.model";

@Component({
  selector: 'app-order-request-review',
  templateUrl: './order-request-review.component.html',
  styleUrls: ['./order-request-review.component.scss']
})
export class OrderRequestReviewComponent implements OnInit {

  @Input() orderRequest: CreateUpdateOrderRequestDto = CreateUpdateOrderRequestDto.fromObject({} as CreateUpdateOrderRequestDto);
  @Input() productName: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
