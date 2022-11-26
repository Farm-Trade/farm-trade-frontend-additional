import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {UserRole} from "../shared/entities/enums/user-role.enum";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = this.authenticationService.getCurrentUser();

        if (currentUser?.role.includes(route.data['role'])) {
          return true;
        }

        return false;
  }
}
