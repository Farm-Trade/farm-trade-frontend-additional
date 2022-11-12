import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Page} from "../../shared/entities/api/page.model";
import {ProductName} from "../../views/storage/model/product-name.model";

@Injectable()
export class ProductNameService {
  private readonly url: string = 'api/product-names';

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getProductNames(queryParams: { [key: string]: any } = {}): Observable<Page<ProductName>> {
    const params: HttpParams = new HttpParams({fromObject: queryParams});
    return this.httpClient.get<Page<ProductName>>(this.url, {params}).pipe(
      map(page => Page.fromObject(page, page.content.map(ProductName.fromObject)))
    );
  }
}
