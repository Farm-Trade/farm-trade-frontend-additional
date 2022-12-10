import { Pipe, PipeTransform } from '@angular/core';
import {PriceUpdateHistory} from "../model/price-update-history.model";

@Pipe({
  name: 'lastPriceUpdater'
})
export class LastPriceUpdaterPipe implements PipeTransform {

  transform(priceUpdateHistory: PriceUpdateHistory[]): PriceUpdateHistory | null {
    const sortedPriceUpdates: PriceUpdateHistory[] = priceUpdateHistory.sort(
      (a, b) => (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime()
    );
    const lastPriceUpdate: PriceUpdateHistory = sortedPriceUpdates[priceUpdateHistory.length - 1];
    return lastPriceUpdate || null;
  }

}
