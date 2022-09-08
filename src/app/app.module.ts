import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ViewsModule} from "./views/views.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedCustomModule} from "./shared/shared-custom.module";
import {AuthModule} from "./shared/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    SharedCustomModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
