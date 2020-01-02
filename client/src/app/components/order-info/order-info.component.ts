import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UnfinishedOrder, Product, PreparedOrder } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrderInfoComponent implements OnInit, OnChanges {

  constructor(private ordersService: OrdersService, private cdr: ChangeDetectorRef) { }
  @Input() selectedOrder: UnfinishedOrder;
  @Input() preparedOrder: PreparedOrder;
  @Output() prepareProducts = new EventEmitter<Product[]>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'name',
    'sku',
    'isSelected',
  ];

  selection = new SelectionModel<Product>(true, this.preparedOrder?.products || []);

  ngOnChanges() {
    if (this.preparedOrder.products.length) {
      for (const product of this.preparedOrder.products) {
        this.selection.select(product);
      }
    }
  }

  ngOnInit() {
    this.selection.changed.asObservable().subscribe((data) => {
      this.onSelectProduct(data);
    });

    this.ordersService.getOrderInfo(this.selectedOrder.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  isAllSelected() {
    if (!this.dataSource) { return; }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onSelectProduct(data: SelectionChange<Product>) {
    this.prepareProducts.emit(data.source.selected);
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
