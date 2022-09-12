import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";
import {FormBuilder} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {CommonModule} from "@angular/common";
import {SharedCustomModule} from "../shared-custom.module";
import {RegistrationDialogComponent} from './components/registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent,
    RegistrationDialogComponent
  ],
  imports: [SharedCustomModule, CommonModule],
  providers: [DialogService, FormBuilder]
})
export class AuthModule {
}
