import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {LoginDialogComponent} from "../components/login-dialog/login-dialog.component";
import {AuthAction} from "../enums/auth-action.enum";
import {RegistrationDialogComponent} from "../components/registration-dialog/registration-dialog.component";
import {DynamicAlertService} from "../../services/dynamic-alert.service";
import {DynamicAlert} from "../../entities/alert/dynamic-alert.model";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public readonly pageKey: string;
  private readonly subscriptions: Subscription;

  constructor(
    private readonly dialogService: DialogService,
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.pageKey = 'app-auth';
    this.subscriptions = new Subscription();

    this.dynamicAlertService.clearAlertByKey(this.pageKey);
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
        const alert: DynamicAlert = new DynamicAlert(
          'Профіль успішно створений та активований, тепер ви можете ввійти в систему',
          'success'
        );
        this.dynamicAlertService.pushAlert(alert, this.pageKey, 10_000);
      }
    })
  }
}
