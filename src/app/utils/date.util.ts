export class DateUtil {
  public static toLocalDateTimeFormat(date: string): string {
    return new Date(date).toISOString();
  }
}
