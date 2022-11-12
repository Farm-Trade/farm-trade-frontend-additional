import {ProductName} from "./product-name.model";
import {User} from "../../../shared/entities/user/user.model";

export class Product {
  constructor(
    public id: number,
    public quantity: number,
    public reservedQuantity: number,
    public size: number,
    public img: string,
    public productName: ProductName,
    public owner: User
  ) {
  }

  public static fromObject(product: Product): Product {
    const productName: ProductName = ProductName.fromObject(product.productName || {} as ProductName);
    const owner: User = User.fromObject(product.owner || {} as User);
    return new Product(
      product.id,
      product.quantity,
      product.reservedQuantity,
      product.size,
      product.img,
      productName,
      owner
    );
  }
}
