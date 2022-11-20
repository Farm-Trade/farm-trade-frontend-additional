import {User} from "../../../shared/entities/user/user.model";

export class PriceUpdateHistory {
  constructor(
    public id: number,
    public updatedFrom: number,
    public updatedTo: number,
    public user: User,
    public createdAt: number
  ) {
  }

  public static fromObject(priceUpdateHistory: PriceUpdateHistory): PriceUpdateHistory {
    const user: User = User.fromObject(priceUpdateHistory.user || {});
    return new PriceUpdateHistory(
      priceUpdateHistory.id,
      priceUpdateHistory.updatedFrom,
      priceUpdateHistory.updatedTo,
      user,
      priceUpdateHistory.createdAt,
    );
  }
}
