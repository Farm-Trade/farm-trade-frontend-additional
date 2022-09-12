import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationForm} from "../../enums/registration-form.enum";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../services/dynamic-alert.service";
import {FormUtil} from "../../../../utils/form.util";
import {AuthenticationDto} from "../../../entities/auth/authentication-dto.model";
import {UserCreateDto} from "../../../entities/user/user-create-dto.model";
import {UserRole} from "../../../entities/enums/user-role.enum";
import {catchError, finalize, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {DynamicAlert} from "../../../entities/alert/dynamic-alert.model";
import {UserService} from "../../../../services/user/user.service";
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

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.pageKey = 'app-registration-dialog';
    this.registrationForm = RegistrationForm;

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

    this.dynamicAlertService.clearAlertByKey(this.pageKey);
  }

  public ngOnInit(): void {
  }

  public registration(): void {
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
    ).subscribe(() => this.ref.close(AuthAction.AFTER_SUCCESS_REGISTRATION));
  }
}
