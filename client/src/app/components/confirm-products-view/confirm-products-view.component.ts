import { Component, OnInit, Input } from '@angular/core';
import { PreparedOrder } from '../../types';

@Component({
  selector: 'app-confirm-products-view',
  templateUrl: './confirm-products-view.component.html',
  styleUrls: ['./confirm-products-view.component.scss']
})
export class ConfirmProductsViewComponent implements OnInit {
  @Input() preparedOrder: PreparedOrder | undefined;

  constructor() { }

  ngOnInit() {
    console.log('confirm order view', this.preparedOrder);
  }
}
