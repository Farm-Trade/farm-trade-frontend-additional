import { Pipe, PipeTransform } from '@angular/core';
import {PaymentType} from "../../profile/enum/payment-type.enum";

@Pipe({
  name: 'paymentTypeTranslator'
})
export class PaymentTypeTranslatorPipe implements PipeTransform {

  transform(value: PaymentType): string {
    switch (value) {
      case PaymentType.CARD:
        return 'Карта';
      case PaymentType.CASH:
        return 'Готівка';
      default:
        return '';
    }
  }

}
