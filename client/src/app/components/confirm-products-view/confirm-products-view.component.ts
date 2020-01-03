import { Component, OnInit, Input } from '@angular/core';
import { PreparedOrder } from '../../types';

@Component({
  selector: 'app-confirm-products-view',
  templateUrl: './confirm-products-view.component.html',
  styleUrls: ['./confirm-products-view.component.scss']
})
export class ConfirmProductsViewComponent implements OnInit {
  @Input() preparedOrder: PreparedOrder | undefined;
  totalPrice = 0;

  constructor() { }

  ngOnInit() {
    this.totalPrice = this.preparedOrder?.products.reduce((result, product) => {
      return result += product.amount * product.price;
    }, 0) ?? 0;
  }
}
