import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  @Input() selectedOrderId: string;
  constructor() { }

  ngOnInit() {
  }

}
