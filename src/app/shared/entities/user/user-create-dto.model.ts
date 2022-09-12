import {UserRole} from "../enums/user-role.enum";

export class UserCreateDto {
  constructor(
    public fullName: string,
    public phone: string,
    public email: string,
    public password: string,
    public role: UserRole
  ) {
  }

  public static fromObject(userCreateDto: UserCreateDto): UserCreateDto {
    return new UserCreateDto(
      userCreateDto.fullName,
      userCreateDto.phone,
      userCreateDto.email,
      userCreateDto.password,
      userCreateDto.role,
    );
  }
}
