import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginFrom} from "../../enums/login-from.enum";
import {AuthenticationDto} from "../../../entities/auth/authentication-dto.model";
import {AuthService} from "../../../services/auth.service";
import {catchError, finalize, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnInit {

  public form: FormGroup;
  public nextButtonPressed: boolean;
  public loginForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.nextButtonPressed = false;
    this.loginForm = LoginFrom;
    this.form = this.fb.group({
      [this.loginForm.PHONE]: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
      [this.loginForm.PASSWORD]: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  public ngOnInit(): void {
  }

  public login(): void {
    this.form.disable();
    const values = {...this.form.value};
    values.phone = values.phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').trim();
    const authenticationDto: AuthenticationDto = AuthenticationDto.fromObject(values);
    this.authService.login(authenticationDto).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error)
        return throwError(() => error);
      }),
      finalize(() => this.form.enable())
    ).subscribe();
  }
}
