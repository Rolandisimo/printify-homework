import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';

import { UnfinishedOrder } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { subscribedContainerMixin } from '../../mixins/subscribedContainer.mixin';

@Component({
  selector: 'app-import-orders-table',
  styleUrls: ['import-orders-table.component.scss'],
  templateUrl: 'import-orders-table.component.html',
})
export class ImportOrdersTableComponent extends subscribedContainerMixin() implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @Output() selectOrder = new EventEmitter<UnfinishedOrder>();

  unfinishedOrders: UnfinishedOrder[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<UnfinishedOrder> | undefined;

  constructor(private ordersService: OrdersService) {
    super();
  }

  ngOnInit() {
    this.ordersService.getUnfinishedOrders()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.unfinishedOrders = data;
        this.displayedColumns = Object.keys(this.unfinishedOrders[0]);
        this.dataSource = new MatTableDataSource(this.unfinishedOrders);
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onRowClick(target: HTMLTableDataCellElement) {
    const rowIdElement = target.querySelector('[data-row-id]');
    if (!rowIdElement) {
      return;
    }

    const orderId = this.getOrderIdFromElement(rowIdElement);
    this.selectOrder.emit(this.unfinishedOrders.find(order => order.id === orderId));
  }

  getOrderIdFromElement(element: Element) {
    return element
      ?.attributes
      ?.getNamedItem('data-row-id')
      ?.value;
  }
}
