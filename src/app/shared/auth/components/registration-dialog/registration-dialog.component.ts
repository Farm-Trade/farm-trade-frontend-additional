import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationForm} from "../../enums/registration-form.enum";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../services/dynamic-alert.service";
import {FormUtil} from "../../../../utils/form.util";
import {UserCreateDto} from "../../../entities/user/user-create-dto.model";
import {UserRole} from "../../../entities/enums/user-role.enum";
import {catchError, finalize, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {DynamicAlert} from "../../../entities/alert/dynamic-alert.model";
import {UserService} from "../../../../services/user/user.service";
import {ActivationCodeDto} from "../../../entities/auth/activation-code-dto.model";
import {AuthAction} from "../../enums/auth-action.enum";

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {
  public form: FormGroup;
  public pageKey: string;
  public registrationForm;
  public isUserActivationShown: boolean;
  public activationControl: FormControl;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.pageKey = 'app-registration-dialog';
    this.registrationForm = RegistrationForm;
    this.isUserActivationShown = false;

    this.form = this.fb.group({
      [this.registrationForm.PHONE]: [null, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(15)
      ]],
      [this.registrationForm.FULL_NAME]: [null, [Validators.required]],
      [this.registrationForm.EMAIL]: [null, [Validators.required, Validators.email]],
      [this.registrationForm.PASSWORD]: [null, [Validators.required, Validators.minLength(10)]]
    });

    this.activationControl = this.fb.control(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(7)
    ])
    this.dynamicAlertService.clearAlertByKey(this.pageKey);
  }

  public ngOnInit(): void {
  }

  public registration(): void {
    this.dynamicAlertService.clearAlertByKey(this.pageKey);
    this.form.disable();
    const values = {...this.form.value};
    values.phone = FormUtil.parsePhoneFromPrimeNgInput(values.phone);
    values.role = UserRole.FARMER;
    const userCreateDto: UserCreateDto = UserCreateDto.fromObject(values);

    this.userService.registration(userCreateDto).pipe(
      catchError((error: HttpErrorResponse) => {
        const alert: DynamicAlert = new DynamicAlert('Підчас створення профілю відбулась помилка')
        this.dynamicAlertService.pushAlert(alert, this.pageKey);
        return throwError(() => error);
      }),
      finalize(() => this.form.enable())
    ).subscribe(() => this.onActivationSetUp());
  }

  public activate(): void {
    this.dynamicAlertService.clearAlertByKey(this.pageKey);
    this.activationControl.disable();
    const activationCodeDto: ActivationCodeDto = new ActivationCodeDto(this.activationControl.value);

    this.userService.activate(activationCodeDto).pipe(
      catchError((error: HttpErrorResponse) => {
        const alert: DynamicAlert = new DynamicAlert('Підчас активації профілю відбулась помилка')
        this.dynamicAlertService.pushAlert(alert, this.pageKey);
        return throwError(() => error);
      }),
      finalize(() => this.activationControl.enable())
    ).subscribe(() => this.ref.close(AuthAction.AFTER_SUCCESS_REGISTRATION));
  }

  private onActivationSetUp(): void {
    this.isUserActivationShown = true;
    this.config.height = '350px'
  }
}
