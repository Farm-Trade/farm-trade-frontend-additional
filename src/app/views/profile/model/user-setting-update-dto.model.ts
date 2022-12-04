export class UserSettingUpdateDto {
  constructor(
    public fullName: string,
    public email: string,
    public password: string | null
  ) {
  }

  public static fromObject(userSettingUpdateDto: UserSettingUpdateDto): UserSettingUpdateDto {
    return new UserSettingUpdateDto(
      userSettingUpdateDto.fullName,
      userSettingUpdateDto.email,
      userSettingUpdateDto.password,
    );
  }
}
