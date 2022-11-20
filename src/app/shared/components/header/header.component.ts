import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {JwtUser} from "../../entities/user/jwt-user.model";
import {Router} from "@angular/router";
import {UserRole} from "../../entities/enums/user-role.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userMenuItems: MenuItem[] = [];
  public user: JwtUser = JwtUser.fromObject({} as JwtUser);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.authService.user$.subscribe(user => {
      if (!user) {
        return;
      }

      this.user = user;
      const additionalItems: MenuItem[] = [];
      if ([UserRole.FARMER, UserRole.ADMIN].includes(this.user.role[0])) {
        additionalItems.push({
            label: 'Склад',
            icon: 'pi pi-database',
            command: () => this.router.navigate(['user-storage'])
          });
      }
      if ([UserRole.RESELLER, UserRole.ADMIN].includes(this.user.role[0])) {
        additionalItems.push({
          label: 'Лоти',
          icon: 'pi pi-code',
          command: () => this.router.navigate(['user-lots'])
        });
      }
      this.userMenuItems = [
        {
          label: 'Профіль',
          icon: 'pi pi-user',
        },
        ...additionalItems,
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
