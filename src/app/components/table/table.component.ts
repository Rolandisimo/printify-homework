import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UnfinishedOrdersService } from '../../services/unfinished-orders.service';
import { UnfinishedOrder } from '../../types';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {
  @Output() selectOrderId = new EventEmitter<string>();
  orders: UnfinishedOrder[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<UnfinishedOrder>;

  constructor(private unfinishedOrdersService: UnfinishedOrdersService) {}

  ngOnInit() {
    this.orders = this.unfinishedOrdersService.getOrders();
    this.displayedColumns = Object.keys(this.orders[0]);
    this.dataSource = new MatTableDataSource(this.orders);
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

    this.selectOrderId.emit(orderId);
  }
}
