import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PriceUpdateHistory} from "../../../model/price-update-history.model";

@Component({
  selector: 'app-price-update-history',
  templateUrl: './price-update-history.component.html',
  styleUrls: ['./price-update-history.component.scss']
})
export class PriceUpdateHistoryComponent implements OnInit {
  @Input() styles: object = {};
  @Input() actionName: string | undefined;
  @Input() priceUpdateHistory: PriceUpdateHistory | undefined;
  @Output() action: EventEmitter<PriceUpdateHistory> = new EventEmitter<PriceUpdateHistory>();
  constructor() { }

  ngOnInit(): void {
  }
}
