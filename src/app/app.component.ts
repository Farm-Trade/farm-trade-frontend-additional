import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Observable} from "rxjs";
import {JwtUser} from "./shared/entities/user/jwt-user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user$: Observable<JwtUser | null>;
  constructor(
    private readonly authService: AuthService
  ) {
    this.user$ = authService.user$;
  }

  public logout(): void {
    this.authService.logout(true);
  }
}
