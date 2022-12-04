import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationDto} from "../../shared/entities/auth/authentication-dto.model";
import {map, Observable, tap} from "rxjs";
import {TokenDto} from "../../shared/entities/auth/token-dto.model";
import {UserCreateDto} from "../../shared/entities/user/user-create-dto.model";
import {User} from "../../shared/entities/user/user.model";
import {ActivationCodeDto} from "../../shared/entities/auth/activation-code-dto.model";
import {ForgotPasswordDto} from "../../shared/entities/auth/forgot-password-dto.model";
import {ResetPasswordDto} from "../../shared/entities/auth/reset-password-dto.model";
import {UserSettingUpdateDto} from "../../views/profile/model/user-setting-update-dto.model";
import {BusinessDetails} from "../../views/profile/model/business-details.model";
import {UpdateBusinessDetailsDto} from "../../views/profile/model/update-business-details-dto.model";

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

  public forgotPassword(forgotPasswordDto: ForgotPasswordDto): Observable<void> {
    return this.httpClient.put<void>(`api/auth/forgot-password`, forgotPasswordDto);
  }

  public checkActivationCode(activationCode: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/from-code/${activationCode}`).pipe(map(User.fromObject));
  }

  public resetPassword(id: number, resetPasswordDto: ResetPasswordDto): Observable<void> {
    return this.httpClient.put<void>(`api/auth/reset-password/${id}`, resetPasswordDto);
  }

  public updateUserSettings(userSettingDto: UserSettingUpdateDto): Observable<TokenDto> {
    return this.httpClient.put<TokenDto>(`${this.url}/update-user-settings`, userSettingDto).pipe(map(TokenDto.fromObject));
  }

  public getBusinessDetails(): Observable<BusinessDetails> {
    return this.httpClient.get<BusinessDetails>(`${this.url}/business-details`).pipe(map(BusinessDetails.fromObject));
  }

  public updateBusinessDetails(updateBusinessDetails: UpdateBusinessDetailsDto): Observable<BusinessDetails> {
    return this.httpClient.put<BusinessDetails>(`${this.url}/business-details`, updateBusinessDetails).pipe(map(BusinessDetails.fromObject));
  }
}
