export class Page<T> {
  constructor(
    public content: T[],
    public first: boolean,
    public last: boolean,
    public number: number,
    public numberOfElements: number,
    public size: number,
    public totalElements: number,
    public totalPages: number
  ) {
  }

  public static fromObject<T>(page: Page<T>, content: T[]): Page<T> {
    return new Page<T>(
      content,
      page.first,
      page.last,
      page.number,
      page.numberOfElements,
      page.size,
      page.totalElements,
      page.totalPages
    )
  }
}
