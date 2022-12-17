import { NgModule } from '@angular/core';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {InputMaskModule} from "primeng/inputmask";
import {MessageModule} from "primeng/message";
import {MenuModule} from "primeng/menu";
import {SpeedDialModule} from "primeng/speeddial";
import {AvatarModule} from "primeng/avatar";
import {SplitButtonModule} from "primeng/splitbutton";
import {SelectButtonModule} from "primeng/selectbutton";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputNumberModule} from "primeng/inputnumber";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputSwitchModule} from "primeng/inputswitch";
import {TabViewModule} from "primeng/tabview";
import {PasswordModule} from "primeng/password";
import {CardModule} from "primeng/card";
import {OverlayPanelModule} from "primeng/overlaypanel";

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
    DataViewModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputNumberModule,
    FileUploadModule,
    TableModule,
    ToolbarModule,
    GalleriaModule,
    ImageModule,
    ToastModule,
    StepsModule,
    CalendarModule,
    InputTextareaModule,
    ConfirmDialogModule,
    InputSwitchModule,
    TabViewModule,
    PasswordModule,
    CardModule,
    OverlayPanelModule
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
    DataViewModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputNumberModule,
    FileUploadModule,
    TableModule,
    ToolbarModule,
    GalleriaModule,
    ImageModule,
    ToastModule,
    StepsModule,
    CalendarModule,
    InputTextareaModule,
    ConfirmDialogModule,
    InputSwitchModule,
    TabViewModule,
    PasswordModule,
    CardModule,
    OverlayPanelModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimeNgModule { }
