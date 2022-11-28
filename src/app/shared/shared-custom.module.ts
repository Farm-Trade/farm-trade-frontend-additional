import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from "./prime-ng.module";
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GetControlPipe} from './pipes/get-control.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    GetControlPipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule

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
    FormsModule
  ]
})
export class SharedCustomModule {
}
