import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationDto} from "../../shared/entities/auth/authentication-dto.model";
import {map, Observable, tap} from "rxjs";
import {TokenDto} from "../../shared/entities/auth/token-dto.model";
import {UserCreateDto} from "../../shared/entities/user/user-create-dto.model";
import {User} from "../../shared/entities/user/user.model";
import {ActivationCodeDto} from "../../shared/entities/auth/activation-code-dto.model";

@Injectable()
export class UserService {
  private readonly url: string = 'api/users';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public registration(userCreateDto: UserCreateDto): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/registration`, userCreateDto).pipe(map(User.fromObject));
  }

  public activate(activationCodeDto: ActivationCodeDto): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/activate`, activationCodeDto);
  }
}
