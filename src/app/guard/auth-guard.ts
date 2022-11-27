import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {UserRole} from "../shared/entities/enums/user-role.enum";
import {JwtUser} from "../shared/entities/user/jwt-user.model";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser: JwtUser | null = this.authenticationService.getCurrentUser();

        return !!currentUser?.role.includes(route.data['role']);
  }
}
