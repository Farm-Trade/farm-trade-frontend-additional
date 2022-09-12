import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from "./prime-ng.module";
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthModule} from "./auth/auth.module";
import {GetControlPipe} from './pipes/get-control.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { DynamicAlertComponent } from './components/dynamic-alert/dynamic-alert.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    GetControlPipe,
    DynamicAlertComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    PrimeNgModule,
    FooterComponent,
    HeaderComponent,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GetControlPipe,
    ReactiveFormsModule,
    DynamicAlertComponent
  ]
})
export class SharedCustomModule {
}
