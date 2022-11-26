export class CreateUpdateOrderRequestDto {
  constructor(
    public quantity: number,
    public unitPrice: number,
    public sizeFrom: number,
    public notes: string,
    public unitPriceUpdate: number,
    public productName: number,
    public loadingDate: string,
    public auctionEndDate: string,
  ) {
  }

  public static fromObject(orderRequest: CreateUpdateOrderRequestDto): CreateUpdateOrderRequestDto {
    return new CreateUpdateOrderRequestDto(
      orderRequest.quantity,
      orderRequest.unitPrice,
      orderRequest.sizeFrom,
      orderRequest.notes,
      orderRequest.unitPriceUpdate,
      orderRequest.productName,
      orderRequest.loadingDate,
      orderRequest.auctionEndDate
    );
  }
}
