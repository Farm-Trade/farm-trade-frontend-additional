import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../views/storage/model/product.model";
import {ProductParams} from "../../views/storage/interface/product-params.interface";
import {Page} from "../../shared/entities/api/page.model";

@Injectable()
export class ProductService {
  private readonly url: string = 'api/products';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getProducts(queryParams: { [key: string]: any } = {}): Observable<Page<Product>> {
    const params: HttpParams = new HttpParams({ fromObject: queryParams });
    return this.httpClient.get<Page<Product>>(this.url, { params }).pipe(
      map(page => Page.fromObject(page, page.content.map(Product.fromObject)))
    );
  }
}
