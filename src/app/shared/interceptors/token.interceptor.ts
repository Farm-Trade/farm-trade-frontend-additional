import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {TokenDto} from "../entities/auth/token-dto.model";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: TokenDto = this.authService.token;

    if (token.token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token.token}`}
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.logout(true);
        }
        return throwError(error)
      })
    );
  }
}
