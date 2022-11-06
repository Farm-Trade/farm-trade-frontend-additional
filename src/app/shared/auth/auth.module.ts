import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";
import {FormBuilder} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {CommonModule} from "@angular/common";
import {SharedCustomModule} from "../shared-custom.module";
import {RegistrationDialogComponent} from './components/registration-dialog/registration-dialog.component';
import {UserService} from "../../services/user/user.service";
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    ForgotPasswordDialogComponent
  ],
  imports: [SharedCustomModule, CommonModule],
  providers: [DialogService, FormBuilder, UserService]
})
export class AuthModule {
}
