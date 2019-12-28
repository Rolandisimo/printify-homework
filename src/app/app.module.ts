import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSortModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ImportOrderComponent } from './components/import-order/import-order.component';
import { ButtonComponent } from './components/button/button.component';
import { ImportOrdersTableComponent } from './components/import-orders-table/import-orders-table.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderViewComponent,
    ImportOrderComponent,
    ButtonComponent,
    ImportOrdersTableComponent,
    OrderInfoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
