import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreparedOrder, Product } from '../../types';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface ProductWithOptions extends Product {
  isOpen?: boolean;
}

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
export class PrepareProductsTableComponent implements OnInit {
  @Input() preparedOrder: PreparedOrder;
  @Output() confirmProducts = new EventEmitter<PreparedOrder>();

  dataSource: MatTableDataSource<ProductWithOptions>;
  displayedColumns: string[] = [
    'name',
    'sku',
    'isSelected',
  ];
  selection = new SelectionModel<ProductWithOptions>(true, []);
  openedProduct: ProductWithOptions | null;

  constructor() { }

  ngOnInit() {
    this.selection.changed.asObservable().subscribe((data) => {
      this.onConfirmProduct(data);
    });

    this.dataSource = new MatTableDataSource(
      this.preparedOrder.products.reduce((rows, current) => {
        rows.push(current, { detailRow: true, element: current });
        return rows;
      }, [])
    );
  }

  onConfirmProduct(selectionData: SelectionChange<ProductWithOptions>) {
    this.confirmProducts.emit({
      ...this.preparedOrder,
      products: selectionData.source.selected,
    });
  }

  toggleProductOptions(product: ProductWithOptions) {
    if (product.id === this.openedProduct?.id) {
      this.openedProduct = null;
    } else {
      // Flip the current opened row
      if (this.openedProduct) {
        this.openedProduct.isOpen = false;
      }
      this.openedProduct = product;
    }

    product.isOpen = !product.isOpen;
  }

  isExpansionDetailRow = (i: number, row: Product) => row.hasOwnProperty('detailRow');
  isProductRow(row: ProductWithOptions) {
    return !row.hasOwnProperty('detailRow');
  }

  isAllSelected() {
    if (!this.dataSource) { return; }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data
      .filter(this.isProductRow)
      .length;
    return numSelected === numRows;
  }


  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data
        .filter(this.isProductRow)
        .forEach(row => this.selection.select(row));
    }
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
