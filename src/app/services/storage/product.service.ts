import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../views/storage/model/product.model";

@Injectable()
export class ProductService {
  private readonly url: string = 'api/products';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }
}
