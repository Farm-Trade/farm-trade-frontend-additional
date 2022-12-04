import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JwtUser} from "../../../../shared/entities/user/jwt-user.model";
import {UserService} from "../../../../services/user/user.service";
import {SpinnerService} from "../../../../services/shared/spinner.service";
import {DynamicAlertService} from "../../../../shared/services/dynamic-alert.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {UserSettingUpdateDto} from "../../model/user-setting-update-dto.model";
import {catchError, finalize} from "rxjs";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  public readonly form: FormGroup;
  public readonly user: JwtUser;

  constructor(
    private readonly userService: UserService,
    private readonly spinnerService: SpinnerService,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder
  ) {
    this.user = this.authService.getSafeUser();
    this.form = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(10)]]
    });
    this.refreshForm();
  }

  public ngOnInit(): void {
  }

  public updateUserSetting(): void {
    this.spinnerService.show();
    const userSettings: UserSettingUpdateDto = UserSettingUpdateDto.fromObject({...this.form.value});
    this.userService.updateUserSettings(userSettings).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError(error => this.dynamicAlertService.handleError(error))
    ).subscribe(token => {
      this.form.controls['password'].patchValue(null);
      this.form.markAsUntouched();
      this.form.markAsPristine();
      this.authService.token = token;
      this.dynamicAlertService.addSuccessMessage('Налаштування користувача оновлено');
    });
  }

  public refreshForm(): void {
    this.form.controls['fullName'].patchValue(this.user.fullName);
    this.form.controls['email'].patchValue(this.user.email);
    this.form.controls['password'].patchValue(null);
  }
}
