import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

import { Order, PreparedOrder, Product } from '../../types';
import { OrdersService } from '../../services/orders.service';
import { subscribedContainerMixin } from '../../mixins/subscribedContainer.mixin';

export enum Step {
  FindOrder,
  PrepareProduct,
  ConfirmOrder,
}

@Component({
  selector: 'app-import-order-view',
  templateUrl: './import-order-view.component.html',
  styleUrls: ['./import-order-view.component.scss']
})
export class ImportOrderViewComponent extends subscribedContainerMixin() implements OnInit {
  steps = [
    Step.FindOrder,
    Step.PrepareProduct,
    Step.ConfirmOrder,
  ];
  selectedStep: Step = this.steps[0];
  selectedOrder: Order | undefined;
  preparedOrder: PreparedOrder = { order: null, products: [] };
  finalOrderWithAllModifications: PreparedOrder | undefined;

  allProductsConfirmed = false;

  constructor(private location: Location, private ordersService: OrdersService) {
    super();
  }

  ngOnInit() {}

  onOrderSelected(order: Order) {
    this.selectedOrder = order;
    this.preparedOrder.order = order;
  }

  onProductSelected(products: Product[]) {
    this.preparedOrder.products = products;
  }

  confirmOrder() {
    try {
      /**
       * Simplified confirmation.
       *
       * Production should have logic for
       * putting back in stock the products
       * that weren't included in the final order
       */
      const finalOrder = this.getFormattedFinalOrder();
      if (!finalOrder) {
        throw new Error('Final order is not properly formatted');
      }

      this.ordersService.postFinishedOrder(finalOrder)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this.redirectHome();
        });

    } catch (error) {
      // TODO: This is not proper error handling. Change to custom error classes. Add visual response to error
      console.error('Posting failed', this.finalOrderWithAllModifications);
    }
  }

  redirectHome() {
    window.location.replace('/');
  }

  getFormattedFinalOrder(): Order | undefined {
    const {
      order,
      products,
    } = this.finalOrderWithAllModifications || {};

    if (!order || !products?.length) {
      return;
    }

    return {
      id: order.id,
      created: moment().format('DD/MM/YYYY'),
      fulfillment: 'Fulfilled', // TODO: Outside of homework scope. Better to have an enum.
      customer: order.customer,
      sost: '124', // TODO: Find out what this is
      price: 123, // TODO: Proper calculation is outside of homework scope
      revenue: products.reduce((res, current) => res += current.price, 0), // TODO: Arbitrary calculation
    };
  }

  goToPrepareProducts() {
    if (this.isGoToPrepareProductsDisabled()) {
      return;
    }

    this.goToNextStep();
  }

  isGoToPrepareProductsDisabled() {
    return !this.preparedOrder.order || !this.preparedOrder.products.length;
  }

  goToConfirmOrder() {
    if (!this.allProductsConfirmed) {
      return;
    }

    this.goToNextStep();
  }

  onProductsConfirmed(preparedOrder: PreparedOrder) {
    this.finalOrderWithAllModifications = preparedOrder;

    if (!preparedOrder.products.length) {
      this.allProductsConfirmed = false;
      return;
    }

    this.allProductsConfirmed = true;
  }

  goToNextStep() {
    this.selectedStep = ++this.selectedStep;
    // this.location.replaceState(this.location.path(), `step=${this.selectedStep}`);
    // this.location.forward();
  }

  isNotLastStep() {
    return this.selectedStep !== this.steps.length - 1;
  }

  goBack() {
    this.selectedStep = this.selectedStep - 1;

    if (this.selectedStep < 0) {
      this.selectedOrder = undefined;
      this.selectedStep = 0;
    }

    // this.location.back();
  }
}
