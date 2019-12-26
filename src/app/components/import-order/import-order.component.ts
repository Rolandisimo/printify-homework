import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

export enum Step {
  FindOrder,
  PrepareProduct,
  ConfirmOrder,
}

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.scss']
})
export class ImportOrderComponent implements OnInit {
  steps = [
    Step.FindOrder,
    Step.PrepareProduct,
    Step.ConfirmOrder,
  ];
  selectedStep: Step = this.steps[0];
  selectedOrderId: string;

  constructor(private location: Location) { }

  ngOnInit() {}

  onOrderSelected(orderId: string) {
    this.selectedOrderId = orderId;
    console.log('ORDER ID clicked', this.selectedOrderId);
  }

  confirmOrder() { // TODO: Redirect to home and add order to state
    console.log('Confirm order');
  }

  goToPrepareProducts() {
    this.goToNextStep();
  }

  goToConfirmOrder() {
    this.goToNextStep();
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
      this.selectedOrderId = null;
      this.selectedStep = 0;
    }

    // this.location.back();
  }
}
