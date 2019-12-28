import { Component, OnInit, Input } from '@angular/core';
import { UnfinishedOrder, UnfinishedOrderWithProducts } from '../../types';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  @Input() selectedOrder: UnfinishedOrder;
  order: UnfinishedOrderWithProducts;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.order = this.ordersService.getOrderInfo(this.selectedOrder.id);
    console.log(this.order);
  }
}
