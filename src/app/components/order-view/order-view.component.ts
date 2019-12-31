import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})

export class OrderViewComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'customer',
    'created',
    'revenue',
    'sost',
    'price',
    'fulfillment',
  ];
  dataSource: MatTableDataSource<Order>;
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ordersService.getFinishedOrders());
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }
}
