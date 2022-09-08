export class TokenDto {
  constructor(
    public token: string
  ) {
  }

  public static fromObject(token: TokenDto): TokenDto {
    return new TokenDto(token.token);
  }
}
