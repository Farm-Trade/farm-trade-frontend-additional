import {NgModule} from '@angular/core';
import { StorageComponent } from './storage/screen/storage.component';
import {ProductService} from "../services/storage/product.service";
import {ProductNameService} from "../services/storage/product-name.service";
import {SharedCustomModule} from "../shared/shared-custom.module";
import {CommonModule} from "@angular/common";
import { UpdateProductComponent } from './storage/screen/dialog/update-product/update-product.component';
import {LotsComponent} from "./lots/screen/lots/lots.component";
import { LastPriceUpdaterPipe } from './lots/pipes/last-price-updater.pipe';
import { UpdateOrderRequestComponent } from './lots/screen/dialog/update-order-request/update-order-request.component';
import { OrderRequestReviewComponent } from './lots/screen/order-request-review/order-request-review.component';
import { ReviewOrderRequestComponent } from './lots/screen/dialog/review-order-request/review-order-request.component';
import { FarmerRelatedLotsComponent } from './lots/screen/farmer-related-lots/farmer-related-lots.component';
import { OwnRatedLotsComponent } from './lots/screen/own-rated-lots/own-rated-lots.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { UserSettingsComponent } from './profile/components/user-settings/user-settings.component';
import { UserBusinessDetailsComponent } from './profile/components/user-bussines-details/user-business-details.component';
import { SelectWinnerComponent } from './lots/screen/dialog/select-winner/select-winner.component';
import { PaymentTypeTranslatorPipe } from './lots/pipes/paymnet-type-translator.pipe';
import { PriceUpdateHistoryComponent } from './lots/screen/component/price-update-hisory/price-update-history.component';


@NgModule({
  declarations: [
    StorageComponent,
    UpdateProductComponent,
    LotsComponent,
    LastPriceUpdaterPipe,
    UpdateOrderRequestComponent,
    OrderRequestReviewComponent,
    ReviewOrderRequestComponent,
    FarmerRelatedLotsComponent,
    OwnRatedLotsComponent,
    ProfileComponent,
    UserSettingsComponent,
    UserBusinessDetailsComponent,
    SelectWinnerComponent,
    PaymentTypeTranslatorPipe,
    PriceUpdateHistoryComponent
  ],
  providers: [
    ProductService,
    ProductNameService
  ],
  imports: [SharedCustomModule, CommonModule]
})
export class ViewsModule {
}
