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
  public menuItems: MenuItem[] = [];
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
      this.setupUserMenu();
      this.setupMenu();
    });
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout(true);
  }

  private setupUserMenu(): void {
    this.userMenuItems.push({label: 'Профіль', icon: 'pi pi-user'});
    if (UserRole.FARMER === this.user.role[0]) {
      this.userMenuItems.push({
        label: 'Склад',
        icon: 'pi pi-database',
        command: () => this.router.navigate(['user-storage'])
      });
    }
    this.userMenuItems.push({label: 'Вийти', icon: 'pi pi-sign-out', command: this.logout.bind(this)});
  }

  private setupMenu(): void {
    this.menuItems.push({label: 'Лоти', routerLink: ['lots']});
    if (UserRole.FARMER === this.user.role[0]) {
      this.menuItems.push({ label: 'Лоти для мене', routerLink: ['farmer-related-lots']});
      this.menuItems.push({ label: 'Мої лоти', routerLink: ['farmer-rated-lots'] });
    }
  }
}
