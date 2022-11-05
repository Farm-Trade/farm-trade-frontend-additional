import {ProductType} from "../enums/product-type.enum";
import {UserRole} from "../../../shared/entities/enums/user-role.enum";

export class ProductName {
  constructor(
    public id: number,
    public name: string,
    public type: ProductType,
    public approved: boolean,
    public createRequestPermission: UserRole
  ) {
  }

  public static fromObject(productName: ProductName): ProductName {
    return new ProductName(
      productName.id,
      productName.name,
      productName.type,
      productName.approved,
      productName.createRequestPermission
    );
  }

}
