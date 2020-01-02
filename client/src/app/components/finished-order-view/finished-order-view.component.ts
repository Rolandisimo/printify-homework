import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-finished-order-view',
  templateUrl: './finished-order-view.component.html',
  styleUrls: ['./finished-order-view.component.scss']
})

export class FinishedOrderViewComponent implements OnInit {
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
    this.ordersService.getFinishedOrders().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
}
