export class AuthenticationDto {
  constructor(
    public phone: string,
    public password: string
  ) {
  }

  public static fromObject(authenticationDto: AuthenticationDto): AuthenticationDto {
    return new AuthenticationDto(
      authenticationDto.phone,
      authenticationDto.password
    );
  }
}
