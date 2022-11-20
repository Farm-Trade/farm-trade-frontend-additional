import {NgModule} from '@angular/core';
import { StorageComponent } from './storage/screen/storage.component';
import {ProductService} from "../services/storage/product.service";
import {ProductNameService} from "../services/storage/product-name.service";
import {SharedCustomModule} from "../shared/shared-custom.module";
import {CommonModule} from "@angular/common";
import { UpdateProductComponent } from './storage/screen/dialog/update-product/update-product.component';
import {LotsComponent} from "./lots/screen/lots.component";
import { LastPriceUpdaterPipe } from './lots/pipes/last-price-updater.pipe';
import { UpdateOrderRequestComponent } from './lots/screen/dialog/update-order-request/update-order-request.component';
import { OrderRequestReviewComponent } from './lots/screen/order-request-review/order-request-review.component';
import { ReviewOrderRequestComponent } from './lots/screen/dialog/review-order-request/review-order-request.component';


@NgModule({
  declarations: [
    StorageComponent,
    UpdateProductComponent,
    LotsComponent,
    LastPriceUpdaterPipe,
    UpdateOrderRequestComponent,
    OrderRequestReviewComponent,
    ReviewOrderRequestComponent
  ],
  providers: [
    ProductService,
    ProductNameService
  ],
  imports: [SharedCustomModule, CommonModule]
})
export class ViewsModule {
}
