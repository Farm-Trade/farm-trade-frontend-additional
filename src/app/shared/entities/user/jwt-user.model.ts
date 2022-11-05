import {UserRole} from "../enums/user-role.enum";
import {JwtParsed} from "../auth/jwt-parsed.model";

export class JwtUser {
  constructor(
    public id: number,
    public fullName: string,
    public phone: string,
    public password: string,
    public isActive: boolean,
    public role: UserRole[]
  ) {
  }

  public static fromObject(jwtUser: JwtUser): JwtUser {
    return new JwtUser(
      jwtUser.id,
      jwtUser.fullName,
      jwtUser.phone,
      jwtUser.password,
      jwtUser.isActive,
      jwtUser.role
    );
  }

  public static fromJwtParsed(jwtParsed: JwtParsed): JwtUser {
    const notDefined: any = null;
    return new JwtUser(
      jwtParsed.id,
      jwtParsed.fullName,
      jwtParsed.sub,
      notDefined,
      notDefined,
      jwtParsed.roles
    );
  }
}
