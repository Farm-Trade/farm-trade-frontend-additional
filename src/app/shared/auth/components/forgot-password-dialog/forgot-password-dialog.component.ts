import {Component, OnInit} from '@angular/core';
import {ForgotPasswordStep} from "../../enums/forgot-password-step.enum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordForm} from "../../enums/forgot-password-form.enum";
import {UserService} from "../../../../services/user/user.service";
import {FormUtil} from "../../../../utils/form.util";
import {ForgotPasswordDto} from "../../../entities/auth/forgot-password-dto.model";
import {catchError, finalize, tap} from "rxjs";
import {DynamicAlertService} from "../../../services/dynamic-alert.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ResetPasswordDto} from "../../../entities/auth/reset-password-dto.model";
import {AuthAction} from "../../enums/auth-action.enum";

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  public currentStep: ForgotPasswordStep;
  public readonly form: FormGroup;
  public readonly forgotPasswordStep = ForgotPasswordStep;
  public readonly forgotPasswordForm = ForgotPasswordForm;
  private userId: number;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.currentStep = ForgotPasswordStep.PHONE_SPECIFICATION;
    this.form = this.fb.group({
      [this.forgotPasswordForm.PHONE]: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
      [this.forgotPasswordForm.CODE]: ['', [Validators.required, Validators.minLength(6)]],
      [this.forgotPasswordForm.PASSWORD]: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.userId = 0;
  }

  ngOnInit(): void {
  }

  sendVerificationCode(): void {
    const formControl: FormControl = this.form.get(this.forgotPasswordForm.PHONE) as FormControl;
    formControl.disable();
    const phone: string = `+38${FormUtil.parsePhoneFromPrimeNgInput(formControl.value)}`;
    this.userService.forgotPassword(ForgotPasswordDto.fromObject({phone})).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => formControl.enable())
    ).subscribe(() => this.currentStep = ForgotPasswordStep.VERIFICATION_CODE_SPECIFICATION);
  }

  checkVerificationCode(): void {
    const formControl: FormControl = this.form.get(this.forgotPasswordForm.CODE) as FormControl;
    formControl.disable();
    this.userService.checkActivationCode(formControl.value.replace("-", "")).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      tap(({id}) => this.userId = id),
      finalize(() => formControl.enable())
    ).subscribe(() => this.currentStep = ForgotPasswordStep.PASSWORD_SPECIFICATION);
  }

  resetPassword(): void {
    const codeControl: FormControl = this.form.get(this.forgotPasswordForm.CODE) as FormControl;
    const passwordControl: FormControl = this.form.get(this.forgotPasswordForm.PASSWORD) as FormControl;
    this.form.disable();
    const body: ResetPasswordDto = ResetPasswordDto.fromObject({
      activationCode: codeControl.value.replace('-', ''),
      password: passwordControl.value
    });
    this.userService.resetPassword(this.userId, body).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.form.enable())
    ).subscribe(() => this.ref.close(AuthAction.AFTER_SUCCESS_RESET_PASSWORD));
  }
}
