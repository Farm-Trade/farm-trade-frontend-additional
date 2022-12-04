import {PaymentType} from "../enum/payment-type.enum";

export class UpdateBusinessDetailsDto {
  constructor(
    public name: string,
    public address: string,
    public paymentType: PaymentType
  ) {
  }

  public static fromObject(updateBusinessDetailsDto: UpdateBusinessDetailsDto): UpdateBusinessDetailsDto {
    return new UpdateBusinessDetailsDto(
      updateBusinessDetailsDto.name,
      updateBusinessDetailsDto.address,
      updateBusinessDetailsDto.paymentType
    );
  }
}
