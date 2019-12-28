import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, UnfinishedOrder, UnfinishedOrderWithProducts } from '../types';

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
];

const OrdersWithProducts: UnfinishedOrderWithProducts[] = [
  {
    id: '1234',
    products: [
      { sku: 'SOCK_101_BIG_1', name: 'CAT_BIG' },
      { sku: 'SOCK_201_BIG_1', name: 'DOG_BIG' },
    ],
  },
  {
    id: '1245',
    products: [
      { sku: 'SOCK_101_BIG_1', name: 'CAT_BIG' },
    ],
  },
  {
    id: '3434',
    products: [
      { sku: 'SOCK_101_BIG_1', name: 'CAT_BIG' },
    ],
  },
  {
    id: '4743',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ],
  },
  {
    id: '5412',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ]
  },
  {
    id: '64325',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ]
  },
  {
    id: '723',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ]
  },
  {
    id: '84232',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ]
  },
  {
    id: '92',
    products: [
      { sku: 'SOCK_101_BIG_1',  name: 'CAT_BIG' }
    ]
  },
];

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getFinishedOrders(): Order[] {
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

  getUnfinishedOrders(): UnfinishedOrder[] {
    return ELEMENT_DATA;
  }

  getOrderInfo(id: string): UnfinishedOrderWithProducts {
    return OrdersWithProducts.find(order => order.id === id);
  }
}
