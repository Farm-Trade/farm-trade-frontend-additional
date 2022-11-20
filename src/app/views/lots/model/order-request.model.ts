import {ProductName} from "../../storage/model/product-name.model";
import {User} from "../../../shared/entities/user/user.model";
import {PriceUpdateHistory} from "./price-update-history.model";

export class OrderRequest {
  constructor(
    public id: number,
    public quantity: number,
    public unitPrice: number,
    public unitPriceUpdate: number,
    public ultimatePrice: number,
    public productName: ProductName,
    public notes: string,
    public loadingDate: Date,
    public auctionEndDate: Date,
    public owner: User,
    public completed: boolean,
    public priceUpdateHistory: PriceUpdateHistory[]
  ) {
  }

  public static fromObject(orderRequest: OrderRequest): OrderRequest {
    const productName: ProductName = ProductName.fromObject(orderRequest.productName || {});
    const owner: User = User.fromObject(orderRequest.owner || {});
    const priceUpdateHistory: PriceUpdateHistory[] = orderRequest.priceUpdateHistory?.map(PriceUpdateHistory.fromObject) || []
    return new OrderRequest(
      orderRequest.id,
      orderRequest.quantity,
      orderRequest.unitPrice,
      orderRequest.unitPriceUpdate,
      orderRequest.ultimatePrice,
      productName,
      orderRequest.notes,
      orderRequest.loadingDate,
      orderRequest.auctionEndDate,
      owner,
      orderRequest.completed,
      priceUpdateHistory
    );
  }
}
