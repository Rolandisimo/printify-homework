import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnfinishedOrder } from '../types';

const ELEMENT_DATA: UnfinishedOrder[] = [
  {id: '1234', customerName: 'Hydrogen', amountOfProducts: 1.0079, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '1245', customerName: 'Helium', amountOfProducts: 4.0026, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '3434', customerName: 'Lithium', amountOfProducts: 6.941, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '4743', customerName: 'Beryllium', amountOfProducts: 9.0122, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '5412', customerName: 'Boron', amountOfProducts: 10.811, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '64325', customerName: 'Carbon', amountOfProducts: 12.0107, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '723', customerName: 'Nitrogen', amountOfProducts: 14.0067, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '84232', customerName: 'Oxygen', amountOfProducts: 15.9994, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '92', customerName: 'Fluorine', amountOfProducts: 18.9984, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
  {id: '1032', customerName: 'Neon', amountOfProducts: 20.1797, orderVolume: 54.43, sku: 'SOCK_101_BIG_1'},
];

@Injectable({
  providedIn: 'root'
})
export class UnfinishedOrdersService {
  private orderUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getOrders(): UnfinishedOrder[] {
    return ELEMENT_DATA;
    // return this.http.get(this.orderUrl);
  }
}
