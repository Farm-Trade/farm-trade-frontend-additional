import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {SharedModule} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {InputMaskModule} from "primeng/inputmask";
import {MessageModule} from "primeng/message";



@NgModule({
  imports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    SharedModule,
    InputMaskModule,
    MessageModule
  ],
  exports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    SharedModule,
    RippleModule,
    InputMaskModule,
    MessageModule
  ]
})
export class PrimeNgModule { }
