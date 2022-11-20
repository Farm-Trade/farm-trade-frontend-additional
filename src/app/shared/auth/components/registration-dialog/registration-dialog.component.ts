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
  public registrationForm = RegistrationForm;
  public isUserActivationShown: boolean;
  public activationControl: FormControl;
  public roleOptions: { name: string, value: UserRole }[];

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.isUserActivationShown = false;
    this.roleOptions = [
      { name: 'Фермер', value: UserRole.FARMER },
      { name: 'Покупець', value: UserRole.RESELLER }
    ];
    this.form = this.fb.group({
      [this.registrationForm.PHONE]: [null, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(15)
      ]],
      [this.registrationForm.FULL_NAME]: [null, [Validators.required]],
      [this.registrationForm.EMAIL]: [null, [Validators.required, Validators.email]],
      [this.registrationForm.PASSWORD]: [null, [Validators.required, Validators.minLength(10)]],
      [this.registrationForm.ROLE]: [UserRole.FARMER, [Validators.required]]
    });

    this.activationControl = this.fb.control(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(7)
    ]);
  }

  public ngOnInit(): void {
  }

  public registration(): void {
    this.form.disable();
    const values = {...this.form.value};
    values.phone = `+38${FormUtil.parsePhoneFromPrimeNgInput(values.phone)}`;
    const userCreateDto: UserCreateDto = UserCreateDto.fromObject(values);

    this.userService.registration(userCreateDto).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.form.enable())
    ).subscribe(() => this.onActivationSetUp());
  }

  public activate(): void {
    this.activationControl.disable();
    const activationCodeDto: ActivationCodeDto = new ActivationCodeDto(this.activationControl.value.replace("-", ""));

    this.userService.activate(activationCodeDto).pipe(
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
      finalize(() => this.activationControl.enable())
    ).subscribe(() => this.ref.close(AuthAction.AFTER_SUCCESS_REGISTRATION));
  }

  private onActivationSetUp(): void {
    this.isUserActivationShown = true;
    this.config.height = '350px'
  }
}
