import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../views/storage/model/product.model";
import {ProductParams} from "../../views/storage/interface/product-params.interface";
import {Page} from "../../shared/entities/api/page.model";
import {CreateProductDto} from "../../views/storage/model/create-product-dto.model";
import {UpdateProductDto} from "../../views/storage/model/update-product-dto.model";

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

  public createProduct(createProductDto: CreateProductDto): Observable<Product> {
    return this.httpClient.post<Product>(this.url, createProductDto).pipe(
      map(Product.fromObject)
    );
  }

  public updateProduct(id: number, createProductDto: UpdateProductDto): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/${id}`, createProductDto).pipe(
      map(Product.fromObject)
    );
  }

  public updateImage(id: number, img: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.set('img', img);
    return this.httpClient.post<void>(`${this.url}/${id}/update-image`, formData);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
