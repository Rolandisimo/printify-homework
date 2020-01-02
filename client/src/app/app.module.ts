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
  MatCheckboxModule,
  MatExpansionModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinishedOrderViewComponent } from './components/finished-order-view/finished-order-view.component';
import { ImportOrderViewComponent } from './components/import-order-view/import-order-view.component';
import { ButtonComponent } from './components/button/button.component';
import { ImportOrdersTableComponent } from './components/import-orders-table/import-orders-table.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { PrepareProductsTableComponent } from './components/prepare-products-table/prepare-products-table.component';
import { ConfirmProductsViewComponent } from './components/confirm-products-view/confirm-products-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FinishedOrderViewComponent,
    ImportOrderViewComponent,
    ButtonComponent,
    ImportOrdersTableComponent,
    OrderInfoComponent,
    PrepareProductsTableComponent,
    ConfirmProductsViewComponent,
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
    MatCheckboxModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
