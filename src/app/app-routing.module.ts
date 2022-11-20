import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared/auth/login/login.component";
import {StorageComponent} from "./views/storage/screen/storage.component";
import {LotsComponent} from "./views/lots/screen/lots.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'storage/:id', component: StorageComponent},
  { path: 'lots/:id', component: LotsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
