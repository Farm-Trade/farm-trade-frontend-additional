export class UpdateProductDto {
  constructor(
    public quantity: number,
    public size: number
  ) {
  }

  public static fromObject(updateProductDto: UpdateProductDto): UpdateProductDto {
    return new UpdateProductDto(updateProductDto.quantity, updateProductDto.size);
  }
}
