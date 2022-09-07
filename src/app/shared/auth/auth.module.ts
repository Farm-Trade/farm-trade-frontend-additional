import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {PrimeNgModule} from "../prime-ng.module";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [PrimeNgModule]
})
export class AuthModule { }
