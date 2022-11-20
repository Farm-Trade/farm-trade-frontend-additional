import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginFrom} from "../../enums/login-from.enum";
import {AuthenticationDto} from "../../../entities/auth/authentication-dto.model";
import {AuthService} from "../../../services/auth.service";
import {catchError, finalize, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../services/dynamic-alert.service";
import {DynamicAlert} from "../../../entities/alert/dynamic-alert.model";
import {AuthAction} from "../../enums/auth-action.enum";
import {FormUtil} from "../../../../utils/form.util";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnInit {
  @ViewChild('passwordInput')
  passwordInput: ElementRef | undefined;
  public form: FormGroup;
  public nextButtonPressed: boolean;
  public loginForm;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dynamicAlertService: DynamicAlertService
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
    values.phone = `+38${FormUtil.parsePhoneFromPrimeNgInput(values.phone)}`;
    const authenticationDto: AuthenticationDto = AuthenticationDto.fromObject(values);
    this.authService.login(authenticationDto).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.form.enable())
    ).subscribe(() => {
      this.ref.close();
      this.router.navigate(['']);
    });
  }

  public onRegistration(): void {
    this.ref.close(AuthAction.REGISTRATION);
  }

  public forgotPassword(): void {
    this.ref.close(AuthAction.RESET_PASSWORD);
  }

  public onNextPressed() {
    this.nextButtonPressed = !this.nextButtonPressed;
    setTimeout(() => {
      if (this.passwordInput && this.passwordInput.nativeElement) {
        this.passwordInput.nativeElement.focus();
      }
    }, 1)
  }
}
