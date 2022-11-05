export class FormUtil {
  public static parsePhoneFromPrimeNgInput(phone: string): string {
    return phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').trim();
  }

  public static isNumberCorrectId(id: number): boolean {
    return !(isNaN(id) || id < 1);
  }
}
