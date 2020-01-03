import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';

import { UnfinishedOrder, Product, PreparedOrder } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { subscribedContainerMixin } from '../../mixins/subscribedContainer.mixin';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent extends subscribedContainerMixin() implements OnInit, OnChanges {
  @Input() selectedOrder: UnfinishedOrder | undefined;
  @Input() preparedOrder: PreparedOrder | undefined;
  @Output() prepareProducts = new EventEmitter<Product[]>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;

  dataSource: MatTableDataSource<Product> | undefined;
  displayedColumns: string[] = [
    'name',
    'sku',
    'isSelected',
  ];

  selection = new SelectionModel<Product>(true, this.preparedOrder?.products || []);

  constructor(private ordersService: OrdersService) {
    super();
  }

  ngOnChanges() {
    if (this.preparedOrder?.products.length) {
      for (const product of this.preparedOrder.products) {
        this.selection.select(product);
      }
    }
  }

  ngOnInit() {
    this.selection.changed.asObservable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.onSelectProduct(data);
      });

    if (this.selectedOrder) {
      this.ordersService.getOrderInfo(this.selectedOrder.id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
    }

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
