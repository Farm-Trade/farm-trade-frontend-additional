export class FormUtil {
  public static parsePhoneFromPrimeNgInput(phone: string): string {
    return phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').trim();
  }
}
