import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishedOrderViewComponent } from './components/finished-order-view/finished-order-view.component';
import { ImportOrderViewComponent } from './components/import-order-view/import-order-view.component';

const routes: Routes = [
  { path: '', component: FinishedOrderViewComponent },
  { path: 'import-orders', component: ImportOrderViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
