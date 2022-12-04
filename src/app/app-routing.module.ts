import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared/auth/login/login.component";
import {StorageComponent} from "./views/storage/screen/storage.component";
import {LotsComponent} from "./views/lots/screen/lots/lots.component";
import {AuthGuard} from "./guard/auth-guard";
import {UserRole} from "./shared/entities/enums/user-role.enum";
import {FarmerRelatedLotsComponent} from "./views/lots/screen/farmer-related-lots/farmer-related-lots.component";
import {OwnRatedLotsComponent} from "./views/lots/screen/own-rated-lots/own-rated-lots.component";
import {ProfileComponent} from "./views/profile/profile.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-storage', component: StorageComponent, canActivate: [AuthGuard], data: {role: UserRole.FARMER}},
  { path: 'farmer-related-lots', component: FarmerRelatedLotsComponent, canActivate: [AuthGuard], data: {role: UserRole.FARMER}},
  { path: 'farmer-rated-lots', component: OwnRatedLotsComponent, canActivate: [AuthGuard], data: {role: UserRole.FARMER}},
  { path: 'profile', component: ProfileComponent },
  { path: 'lots', component: LotsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
