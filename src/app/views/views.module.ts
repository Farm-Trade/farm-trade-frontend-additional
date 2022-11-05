import {NgModule} from '@angular/core';
import { StorageComponent } from './storage/screen/storage.component';
import {ProductService} from "../services/storage/product.service";
import {ProductNameService} from "../services/storage/product-name.service";
import {SharedCustomModule} from "../shared/shared-custom.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    StorageComponent
  ],
  providers: [
    ProductService,
    ProductNameService
  ],
  imports: [SharedCustomModule, CommonModule]
})
export class ViewsModule {
}
