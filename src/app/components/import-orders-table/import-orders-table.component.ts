import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UnfinishedOrder, Order } from '../../types';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-import-orders-table',
  styleUrls: ['import-orders-table.component.scss'],
  templateUrl: 'import-orders-table.component.html',
})
export class ImportOrdersTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() selectOrder = new EventEmitter<UnfinishedOrder>();

  unfinishedOrders: UnfinishedOrder[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<UnfinishedOrder>;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.unfinishedOrders = this.ordersService.getUnfinishedOrders();
    this.displayedColumns = Object.keys(this.unfinishedOrders[0]);
    this.dataSource = new MatTableDataSource(this.unfinishedOrders);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(target: HTMLTableDataCellElement) {
    const rowIdElement = target.querySelector('[data-row-id]');
    if (!rowIdElement) {
      return;
    }

    const orderId = rowIdElement
      .attributes
      .getNamedItem('data-row-id')
      .value;

    this.selectOrder.emit(this.unfinishedOrders.find(order => order.id === orderId));
  }
}
