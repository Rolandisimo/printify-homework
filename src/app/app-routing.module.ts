import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ImportOrderComponent } from './components/import-order/import-order.component';

const routes: Routes = [
  { path: '', component: OrderViewComponent },
  { path: 'import-orders', component: ImportOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
