import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicAlertService} from "../../../../../shared/services/dynamic-alert.service";
import {ProductService} from "../../../../../services/storage/product.service";
import {Product} from "../../../model/product.model";
import {catchError, finalize, map, Observable, Observer, of, Subject} from "rxjs";
import {ProductNameService} from "../../../../../services/storage/product-name.service";
import {SelectItem} from "primeng/api";
import {ProductType} from "../../../enums/product-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {UpdateProductDto} from "../../../model/update-product-dto.model";
import {CreateProductDto} from "../../../model/create-product-dto.model";
import {SpinnerService} from "../../../../../services/shared/spinner.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  public productNames$: Observable<SelectItem[]>;
  public imgSrc: string | ArrayBuffer | null;
  public uploadLabel: string;
  public readonly product: Product;
  public readonly form: FormGroup;
  public readonly isUpdateWindow: boolean;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly productService: ProductService,
    private readonly productServiceName: ProductNameService,
    private readonly spinnerService: SpinnerService
  ) {
    this.product = this.config.data.product;
    this.isUpdateWindow = this.config.data.isUpdateWindow;
    this.form = this.getFrom();
    this.uploadLabel = this.isUpdateWindow ? this.product.img : 'Завантажте зображення';
    this.imgSrc = this.isUpdateWindow && this.product.img ? `${environment.backendUrl}/api/${this.product.img}` : null;
    const queryParams: { [key: string]: any } = {type: ProductType.APPLE, size: 10_000};
    this.productNames$ = this.productServiceName.getProductNamesAsSelectedItems(queryParams);
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.spinnerService.show();
    const afterSave: Subject<Product | HttpErrorResponse> = new Subject<Product | HttpErrorResponse>();
    afterSave.subscribe(this.onSaveResponseHandler.bind(this));

    const values = {...this.form.value}
    const observer: Observer<Product> = {
      next: product => afterSave.next(product),
      error: error => afterSave.next(error),
      complete: () => {
      }
    }
    if (this.isUpdateWindow) {
      this.productService.updateProduct(this.product.id, UpdateProductDto.fromObject(values))
        .pipe(finalize(() => this.spinnerService.hide()))
        .subscribe(observer)
    } else {
      this.productService.createProduct(CreateProductDto.fromObject(values))
        .pipe(finalize(() => this.spinnerService.hide()))
        .subscribe(observer);
    }
  }

  onClose(): void {
    this.ref.close();
  }

  onImgUploaded(event: Event): void {
    if (!(event.target && (event.target as any).files && (event.target as any).files.length)) {
      return;
    }
    const file: File = (event.target as any).files[0];
    this.form.controls['img'].setValue(file)
    this.uploadLabel = file.name;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  private onSaveResponseHandler(response: Product | HttpErrorResponse): void {
    if (response instanceof HttpErrorResponse) {
      this.dynamicAlertService.handleError(response);
      return;
    }
    const img: AbstractControl = this.form.controls['img'].value;
    if (img && img instanceof File) {
      this.spinnerService.show();
      const uploadObserver: Observer<void> = {
        next: () => this.ref.close(response),
        error: () => {
        },
        complete: () => {
        }
      };
      this.productService.updateImage(response.id, img)
        .pipe(
          catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService)),
          finalize(() => this.spinnerService.hide())
        )
        .subscribe(uploadObserver)
      return;
    }
    this.ref.close(response);
  }

  private getFrom(): FormGroup {
    const from: FormGroup = this.fb.group({
      id: [this.product.id || null],
      quantity: [this.product.quantity || null, [Validators.required]],
      size: [this.product.quantity || null, [Validators.required]],
      productName: [this.product.productName ? this.product.productName.id : null, [Validators.required]],
      img: [null, []]
    });

    if (this.isUpdateWindow) {
      from.controls['productName'].disable();
    } else {
      from.controls['img'].setValidators([Validators.required])
    }
    return from;
  }
}
