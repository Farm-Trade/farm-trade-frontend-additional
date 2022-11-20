import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {LoginDialogComponent} from "../components/login-dialog/login-dialog.component";
import {AuthAction} from "../enums/auth-action.enum";
import {RegistrationDialogComponent} from "../components/registration-dialog/registration-dialog.component";
import {DynamicAlertService} from "../../services/dynamic-alert.service";
import {DynamicAlert} from "../../entities/alert/dynamic-alert.model";
import {ForgotPasswordDialogComponent} from "../components/forgot-password-dialog/forgot-password-dialog.component";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription;

  constructor(
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public login(): void {
    const ref = this.dialogService.open(
      LoginDialogComponent,
      {
        width: '550px',
        height: '450px'
      }
    );

    ref.onClose.subscribe(response => {
      if (response === AuthAction.REGISTRATION) {
        this.openRegistration();
      } else if (response === AuthAction.RESET_PASSWORD) {
        this.openForgotPassword()
      }
    })
  }

  public openRegistration(): void {
     const ref = this.dialogService.open(
      RegistrationDialogComponent,
      {
        width: '550px',
        height: '550px'
      }
    );

    ref.onClose.subscribe(response => {
      if (response === AuthAction.AFTER_SUCCESS_REGISTRATION) {
        this.dynamicAlertService.addSuccessMessage(
          'Профіль успішно створений та активований, тепер ви можете ввійти в систему'
        );
      }
    })
  }

  private openForgotPassword(): void {
    const ref = this.dialogService.open(
      ForgotPasswordDialogComponent,
      {
        width: '550px',
        height: '250px'
      }
    );

    ref.onClose.subscribe(response => {
      if (response === AuthAction.AFTER_SUCCESS_RESET_PASSWORD) {
        this.dynamicAlertService.addSuccessMessage(
          'Пароль успішно змінений, тепер ви можете ввійти в систему з новим паролем'
        );
      }
    })
  }
}
