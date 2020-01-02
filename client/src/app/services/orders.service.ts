import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, UnfinishedOrder, UnfinishedOrderWithProducts, PreparedOrder } from '../types';
import { BASE_URL, FINISHED_ORDERS, UNFINISHED_ORDERS, ORDER_PRODUCTS } from './requests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  getFinishedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE_URL}${FINISHED_ORDERS}`);
  }
  postFinishedOrder(order: Order) {
    return this.http.post<PreparedOrder>(`${BASE_URL}${FINISHED_ORDERS}`, order);
  }

  getUnfinishedOrders(): Observable<UnfinishedOrder[]> {
    return this.http.get<UnfinishedOrder[]>(`${BASE_URL}${UNFINISHED_ORDERS}`);
  }

  getOrderInfo(id: string): Observable<UnfinishedOrderWithProducts> {
    // return OrdersWithProducts.find(order => order.id === id);
    return this.http.get<UnfinishedOrderWithProducts>(
      `${BASE_URL}${ORDER_PRODUCTS}`,
      {
        params: {
          id,
        }
      },
    );
  }
}
