import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {JwtUser} from "../../entities/user/jwt-user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userMenuItems: MenuItem[] = [];
  public menuItems: MenuItem[] = [];
  public user: JwtUser = JwtUser.fromObject({} as JwtUser);

  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      if (!user) {
        return;
      }

      this.user = user;
      this.userMenuItems = [
        {
          label: 'Профіль',
          icon: 'pi pi-user',
        },
        {
          label: 'Склад',
          icon: 'pi pi-database'
        },
        {
          label: 'Вийти',
          icon: 'pi pi-sign-out',
          command: this.logout.bind(this)
        }
      ];
    });
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout(true);
  }
}
