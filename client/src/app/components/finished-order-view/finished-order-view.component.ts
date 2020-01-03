import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';

import { Order } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { subscribedContainerMixin } from '../../mixins/subscribedContainer.mixin';

@Component({
  selector: 'app-finished-order-view',
  templateUrl: './finished-order-view.component.html',
  styleUrls: ['./finished-order-view.component.scss']
})
export class FinishedOrderViewComponent extends subscribedContainerMixin() implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    'id',
    'customer',
    'created',
    'revenue',
    'sost',
    'price',
    'fulfillment',
  ];
  dataSource: MatTableDataSource<Order> | undefined;

  constructor(private ordersService: OrdersService) {
    super();
  }

  ngOnInit() {
    this.ordersService.getFinishedOrders()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      });
  }
}
