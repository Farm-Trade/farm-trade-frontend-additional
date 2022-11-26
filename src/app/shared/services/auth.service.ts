import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of, switchMap, tap, throwError} from "rxjs";
import {AuthenticationDto} from "../entities/auth/authentication-dto.model";
import {TokenDto} from "../entities/auth/token-dto.model";
import jwt_decode from "jwt-decode";
import {JwtUser} from "../entities/user/jwt-user.model";
import {LocalStorage} from "../entities/enums/local-storage.enum";
import {JwtParsed} from "../entities/auth/jwt-parsed.model";
import {Params, Router} from "@angular/router";
import {FormUtil} from "../../utils/form.util";

@Injectable({providedIn: 'root'})
export class AuthService {
  public readonly user$: Observable<JwtUser | null>

  private readonly url: string = 'api/auth';
  private readonly _user$: BehaviorSubject<JwtUser | null>;

  public get token(): TokenDto {
    const token: string = localStorage.getItem(LocalStorage.TOKEN) as string;
    return TokenDto.fromObject({ token })
  }
  private set token(token: TokenDto) {
    localStorage.setItem(LocalStorage.TOKEN, token.token)
    const jwtUser: JwtUser = AuthService.fromToken(token.token);
    this._user$.next(jwtUser);
  }
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {
    this._user$ = new BehaviorSubject<JwtUser | null>(null);
    this.user$ = this._user$.asObservable();
  }

  public getCurrentUser(): JwtUser | null {
    return this._user$.getValue();
  }

  public isAuthenticated(): boolean {
    return !!this._user$.getValue();
  }
  public logout(redirectToLogin: boolean = false, callBack: () => void = () => {}): void {
    localStorage.removeItem(LocalStorage.TOKEN);
    this._user$.next(null);
    if (redirectToLogin) {
      this.router.navigate(['login']);
    }
    callBack();
  }
  public login(authenticationDto: AuthenticationDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(`${this.url}/login`, authenticationDto)
      .pipe(tap(token => this.token = token));
  }

  public init(): void {
    const token: TokenDto = this.token;
    if (token.token) {
      const jwtParsed: JwtParsed = JwtParsed.fromObject(jwt_decode(token.token));
      if (!jwtParsed.isExpired()) {
        this._user$.next(JwtUser.fromJwtParsed(jwtParsed));
        return;
      }
    }
    this.logout(true)
  }

  public isOwnUserId(id: number): boolean {
    const user: JwtUser | null = this._user$.getValue();
    return !!user && user.id === id;
  }

  public getRightUser(params: Observable<Params>): Observable<JwtUser> {
    return params.pipe(
      map(({ id }) => +id),
      switchMap( id => {
        if (!FormUtil.isNumberCorrectId(id) || !this.isOwnUserId(id)) {
          this.router.navigate(['/']);
          return throwError(() => "Невірний користувач переданий");
        }
        return this.user$.pipe(
          switchMap(user => user ? of(user) : throwError(() => "Користувача не існує"))
        );
      })
    );
  }
  private static fromToken(token: string): JwtUser {
    const jwtParsed: JwtParsed = JwtParsed.fromObject(jwt_decode(token));
    return  JwtUser.fromJwtParsed(jwtParsed);
  }
}
