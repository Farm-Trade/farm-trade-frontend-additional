import { NgModule } from '@angular/core';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {SharedModule} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {InputMaskModule} from "primeng/inputmask";
import {MessageModule} from "primeng/message";
import {MenuModule} from "primeng/menu";
import {SpeedDialModule} from "primeng/speeddial";
import {AvatarModule} from "primeng/avatar";
import {SplitButtonModule} from "primeng/splitbutton";
import {SelectButtonModule} from "primeng/selectbutton";
import {DataViewModule} from "primeng/dataview";



@NgModule({
  imports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    SharedModule,
    InputMaskModule,
    MessageModule,
    MegaMenuModule,
    MenuModule,
    SpeedDialModule,
    AvatarModule,
    SplitButtonModule,
    SelectButtonModule,
    DataViewModule
  ],
  exports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    SharedModule,
    RippleModule,
    InputMaskModule,
    MessageModule,
    MegaMenuModule,
    MenuModule,
    SpeedDialModule,
    AvatarModule,
    SplitButtonModule,
    SelectButtonModule,
    DataViewModule
  ]
})
export class PrimeNgModule { }
