import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ViewsModule} from "./views/views.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedCustomModule} from "./shared/shared-custom.module";
import {AuthModule} from "./shared/auth/auth.module";
import {AuthService} from "./shared/services/auth.service";
import {InitializerUtil} from "./utils/initializer.util";

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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: InitializerUtil.setUpAuthData,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
