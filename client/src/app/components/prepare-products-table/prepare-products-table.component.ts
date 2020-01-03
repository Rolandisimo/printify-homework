import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';

import { subscribedContainerMixin } from '../../mixins/subscribedContainer.mixin';
import { PreparedOrder, Product } from '../../types';

interface ProductWithOptions extends Product {
  isOpen?: boolean;
}
interface ProductDetailRow {
  detailRow: boolean;
  element: Product;
}

type ProductAndDetailsRows = ProductDetailRow | ProductWithOptions;

@Component({
  selector: 'app-prepare-products-table',
  templateUrl: './prepare-products-table.component.html',
  styleUrls: ['./prepare-products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrepareProductsTableComponent extends subscribedContainerMixin() implements OnInit {
  @Input() preparedOrder: PreparedOrder | undefined;
  @Output() confirmProducts = new EventEmitter<PreparedOrder>();

  dataSource: MatTableDataSource<ProductAndDetailsRows> | undefined;
  displayedColumns: string[] = [
    'name',
    'sku',
    'isSelected',
  ];
  selection = new SelectionModel<ProductWithOptions>(true, []);
  openedProduct: ProductWithOptions | undefined;

  constructor() {
    super();
  }

  ngOnInit() {
    this.selection.changed.asObservable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.onConfirmProduct(data);
      });

    this.dataSource = new MatTableDataSource(
      this.preparedOrder?.products.reduce((rows: ProductAndDetailsRows[], current: ProductWithOptions ) => {
        rows.push(current, { detailRow: true, element: current });
        return rows;
      }, [])
    );
  }

  onConfirmProduct(selectionData: SelectionChange<ProductWithOptions>) {
    if (!this.preparedOrder) {
      return;
    }

    this.confirmProducts.emit({
      ...this.preparedOrder,
      products: selectionData.source.selected,
    });
  }

  toggleProductOptions(product: ProductWithOptions) {
    if (product.id === this.openedProduct?.id) {
      this.clearTheCurrentOpenedRow();
    } else {
      this.flipTheCurrentOpenedRow(product);
    }

    product.isOpen = !product.isOpen;
  }

  clearTheCurrentOpenedRow() {
    this.openedProduct = undefined;
  }

  flipTheCurrentOpenedRow(product: ProductWithOptions) {
    if (this.openedProduct) {
      this.openedProduct.isOpen = false;
    }
    this.openedProduct = product;
  }


  isAllSelected() {
    if (!this.dataSource) { return; }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data
      .filter(this.isProductRow)
      .length;
    return numSelected === numRows;
  }

  isProductRow(row: ProductAndDetailsRows) {
    return !row.hasOwnProperty('detailRow');
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.clearAllCheckboxes();
    } else {
      this.selectAllCheckboxes();
    }
  }

  clearAllCheckboxes() {
    this.selection.clear();
  }

  selectAllCheckboxes() {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data
      .filter(this.isProductRow)
      .forEach((row) => this.selection.select(row as Product));
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  isExpansionDetailRow = (i: number, row: Product) => row.hasOwnProperty('detailRow');
}
