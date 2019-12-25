import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Order } from '../types';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getOrders(): Order[] {
    return [
      {
        created: '',
        customer: 'John Smith',
        id: '1',
        price: 123,
        revenue: 123,
        sost: '13',
        fulfillment: 'Fulfilled',
      },
      {
        created: '',
        customer: 'Maria Smith',
        id: '2',
        price: 23,
        revenue: 123,
        sost: '13',
        fulfillment: 'Quality Control',
      },
      {
        created: '',
        customer: 'John Maria',
        id: '1',
        price: 5,
        revenue: 90,
        sost: '13',
        fulfillment: 'In production',
      },
    ];
    // return this.http.get(this.orderUrl);
  }
}
