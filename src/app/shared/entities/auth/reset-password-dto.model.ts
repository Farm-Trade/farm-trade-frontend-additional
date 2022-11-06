export class ResetPasswordDto {
  constructor(
    public activationCode: string,
    public password: string
  ) {
  }

  public static fromObject(resetPasswordDto: ResetPasswordDto): ResetPasswordDto {
    return new ResetPasswordDto(resetPasswordDto.activationCode, resetPasswordDto.password);
  }
}
