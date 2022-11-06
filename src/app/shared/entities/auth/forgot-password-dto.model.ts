export class ForgotPasswordDto {
  constructor(public phone: string) {
  }

  public static fromObject(forgotPasswordDto: ForgotPasswordDto): ForgotPasswordDto {
    return new ForgotPasswordDto(forgotPasswordDto.phone);
  }
}
