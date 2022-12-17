import {UserRole} from "../enums/user-role.enum";
import {BusinessDetails} from "../../../views/profile/model/business-details.model";

export class User {
  constructor(
    public id: number,
    public fullName: string,
    public createdAt: number,
    public phone: string,
    public email: string,
    public isActive: boolean,
    public role: UserRole,
    public businessDetails: null | BusinessDetails
  ) {
  }

  public static fromObject(user: User): User {
    return new User(
      user.id,
      user.fullName,
      user.createdAt,
      user.phone,
      user.email,
      user.isActive,
      user.role,
      user.businessDetails
    );
  }
}
