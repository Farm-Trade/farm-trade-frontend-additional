export class CreateProductDto {
  constructor(
    public quantity: number,
    public size: number,
    public productName: number
  ) {
  }

  public static fromObject(createProductDto: CreateProductDto): CreateProductDto {
    return new CreateProductDto(createProductDto.quantity, createProductDto.size, createProductDto.productName);
  }
}
