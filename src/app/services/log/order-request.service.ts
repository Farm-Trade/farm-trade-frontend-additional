import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Page} from "../../shared/entities/api/page.model";
import {OrderRequest} from "../../views/lots/model/order-request.model";
import {CreateUpdateOrderRequestDto} from "../../views/lots/model/create-update-order-request-dto.model";

@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {
  private readonly url: string = 'api/order-requests';

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getOrderRequests(queryParams: { [key: string]: any } = {}): Observable<Page<OrderRequest>> {
    const params: HttpParams = new HttpParams({ fromObject: queryParams });
    return this.httpClient.get<Page<OrderRequest>>(this.url, { params }).pipe(
      map(page => Page.fromObject(page, page.content.map(OrderRequest.fromObject)))
    );
  }

  public createOrderRequest(orderRequest: CreateUpdateOrderRequestDto): Observable<OrderRequest> {
    return this.httpClient.post<OrderRequest>(this.url, orderRequest);
  }

  public updateOrderRequest(id: number, orderRequest: CreateUpdateOrderRequestDto): Observable<OrderRequest> {
    return this.httpClient.put<OrderRequest>(`${this.url}/${id}`, orderRequest);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
  public publish(id: number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}/transition`, {});
  }
}
