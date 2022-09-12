export class ActivationCodeDto {
  constructor(
    public activationCode: string
  ) {
  }

  public static fromObject(activationCodeDto: ActivationCodeDto): ActivationCodeDto {
    return new ActivationCodeDto(
      activationCodeDto.activationCode
    );
  }
}
