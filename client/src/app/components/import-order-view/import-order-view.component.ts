import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Order, PreparedOrder, Product } from '../../types';
import { OrdersService } from '../../services/orders.service';

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
export class ImportOrderViewComponent implements OnInit {
  steps = [
    Step.FindOrder,
    Step.PrepareProduct,
    Step.ConfirmOrder,
  ];
  selectedStep: Step = this.steps[0];
  selectedOrder: Order;
  preparedOrder: PreparedOrder = {
    order: null,
    products: [],
  };

  finalProductWithAllModifications: PreparedOrder;
  allProductsConfirmed = false;

  goToProductsDisabled = true; // TODO: Change to isGoToProductsDisabled

  constructor(private location: Location, private ordersService: OrdersService) { }

  ngOnInit() {}

  onOrderSelected(order: Order) {
    this.selectedOrder = order;
    this.preparedOrder.order = order;
  }

  onProductSelected(products: Product[]) {
    this.preparedOrder.products = products;
  }

  async confirmOrder() { // TODO: Redirect to home and add order to state
    try {
      await this.ordersService.postFinishedOrder(
        this.getFormattedFinalOrder()
      ).toPromise();

      this.redirectHome();
    } catch (error) {
      // TODO: This is not proper error handling. Change to custom error classes. Add visual response to error
      console.error('Posting failed', this.finalProductWithAllModifications);
    }
  }

  redirectHome() {
    window.location.replace('/');
  }

  getFormattedFinalOrder(): Order {
    const {
      order,
      products,
    } = this.finalProductWithAllModifications;

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
    this.finalProductWithAllModifications = preparedOrder;

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
      this.selectedOrder = null;
      this.selectedStep = 0;
    }

    // this.location.back();
  }
}
