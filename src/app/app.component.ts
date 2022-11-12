import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Observable} from "rxjs";
import {JwtUser} from "./shared/entities/user/jwt-user.model";
import {SpinnerService} from "./services/shared/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly user$: Observable<JwtUser | null>;
  public readonly isLoading$: Observable<boolean>
  constructor(
    private readonly authService: AuthService,
    private readonly spinnerService: SpinnerService
  ) {
    this.user$ = authService.user$;
    this.isLoading$ = spinnerService.loading$;
  }

  public logout(): void {
    this.authService.logout(true);
  }
}
