import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared/auth/login/login.component";
import {StorageComponent} from "./views/storage/screen/storage.component";
import {LotsComponent} from "./views/lots/screen/lots.component";
import {AuthGuard} from "./guard/auth-guard";
import {UserRole} from "./shared/entities/enums/user-role.enum";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-storage', component: StorageComponent, canActivate: [AuthGuard], data: {role: UserRole.FARMER}},
  { path: 'user-lots', component: LotsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
