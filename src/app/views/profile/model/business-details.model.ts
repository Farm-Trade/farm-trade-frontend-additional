import {PaymentType} from "../enum/payment-type.enum";

export class BusinessDetails {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public paymentType: PaymentType
  ) {
  }

  public static fromObject(businessDetails: BusinessDetails): BusinessDetails {
    return new BusinessDetails(
      businessDetails.id,
      businessDetails.name,
      businessDetails.address,
      businessDetails.paymentType
    );
  }
}
