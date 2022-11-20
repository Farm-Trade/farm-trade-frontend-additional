import {ProductName} from "../../storage/model/product-name.model";
import {User} from "../../../shared/entities/user/user.model";
import {PriceUpdateHistory} from "./price-update-history.model";
import {CreateUpdateOrderRequestDto} from "./create-update-order-request-dto.model";
import {OrderRequestStatus} from "../enum/order-request-status.enum";

export class OrderRequest {
  constructor(
    public id: number,
    public quantity: number,
    public unitPrice: number,
    public unitPriceUpdate: number,
    public sizeFrom: number,
    public productName: ProductName,
    public notes: string,
    public loadingDate: string,
    public auctionEndDate: string,
    public owner: User,
    public status: OrderRequestStatus,
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
      orderRequest.sizeFrom,
      productName,
      orderRequest.notes,
      orderRequest.loadingDate,
      orderRequest.auctionEndDate,
      owner,
      orderRequest.status,
      priceUpdateHistory
    );
  }

  static fromCreateUpdateOrderRequestDto(
    createUpdateOrderRequestDto: CreateUpdateOrderRequestDto,
    productName: ProductName
  ): OrderRequest {
    return new OrderRequest(
      0,
      createUpdateOrderRequestDto.quantity,
      createUpdateOrderRequestDto.unitPrice,
      createUpdateOrderRequestDto.unitPriceUpdate,
      createUpdateOrderRequestDto.sizeFrom,
      productName,
      createUpdateOrderRequestDto.notes,
      createUpdateOrderRequestDto.loadingDate,
      createUpdateOrderRequestDto.auctionEndDate,
      null as any,
      OrderRequestStatus.PUBLISHED,
      []
    );
  }
}
