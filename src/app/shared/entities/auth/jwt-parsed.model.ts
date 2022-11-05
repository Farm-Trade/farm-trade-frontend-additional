import {UserRole} from "../enums/user-role.enum";

export class JwtParsed {
  constructor(
    public sub: string,
    public id: number,
    public roles: UserRole[],
    public email: string,
    public fullName: string,
    public iat: number,
    public exp: number
  ) {
  }

  public static fromObject(jwtParsed: JwtParsed): JwtParsed {
    return new JwtParsed(
      jwtParsed.sub,
      jwtParsed.id,
      jwtParsed.roles,
      jwtParsed.email,
      jwtParsed.fullName,
      jwtParsed.iat,
      jwtParsed.exp
    );
  }

  public isExpired(): boolean {
    return (this.exp - new Date().getTime() / 1000) <= 0;
  }
}
