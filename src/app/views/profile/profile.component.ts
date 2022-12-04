import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {JwtUser} from "../../shared/entities/user/jwt-user.model";
import {UserRole} from "../../shared/entities/enums/user-role.enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  public readonly user: JwtUser;
  public readonly isFarmer: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.user = this.authService.getSafeUser();
    this.isFarmer = this.user.role[0] === UserRole.FARMER;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
