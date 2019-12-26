import { Component, OnInit } from '@angular/core';
import { Order } from '../../types';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  orders: Order[] = [];
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
    console.log(this.orders);
  }
}
