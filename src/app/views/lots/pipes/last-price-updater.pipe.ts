import { Pipe, PipeTransform } from '@angular/core';
import {PriceUpdateHistory} from "../model/price-update-history.model";

@Pipe({
  name: 'lastPriceUpdater'
})
export class LastPriceUpdaterPipe implements PipeTransform {

  transform(priceUpdateHistory: PriceUpdateHistory[]): PriceUpdateHistory | null {
    const lastPriceUpdate: PriceUpdateHistory = priceUpdateHistory[priceUpdateHistory.length - 1];
    return lastPriceUpdate || null;
  }

}
