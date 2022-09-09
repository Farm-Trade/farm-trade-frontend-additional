import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {PrimeNgModule} from "../prime-ng.module";
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {CommonModule} from "@angular/common";
import {SharedCustomModule} from "../shared-custom.module";
import {AuthService} from "../services/auth.service";

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent
  ],
  imports: [SharedCustomModule, CommonModule],
  providers: [DialogService, FormBuilder]
})
export class AuthModule { }
