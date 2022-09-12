import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {LoginDialogComponent} from "../components/login-dialog/login-dialog.component";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly subscriptions: Subscription;

  constructor(
    private readonly dialogService: DialogService
  ) {
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public login(): void {
    this.dialogService.open(
      LoginDialogComponent,
      {
        width: '550px',
        height: '450px'
      }
    );
  }
}
