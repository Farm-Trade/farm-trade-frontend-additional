import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicAlertService} from "../../../../../shared/services/dynamic-alert.service";
import {ProductService} from "../../../../../services/storage/product.service";
import {Product} from "../../../model/product.model";
import {catchError, map, Observable, Observer, of, Subject} from "rxjs";
import {ProductNameService} from "../../../../../services/storage/product-name.service";
import {SelectItem} from "primeng/api";
import {ProductType} from "../../../enums/product-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {UpdateProductDto} from "../../../model/update-product-dto.model";
import {CreateProductDto} from "../../../model/create-product-dto.model";
import {SpinnerService} from "../../../../../services/shared/spinner.service";
import {FileUpload} from "primeng/fileupload";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('fileUpload')
  public fileUploader: FileUpload | undefined;
  public productNames$: Observable<SelectItem[]>;
  public img: File | undefined;
  public uploadLabel: string;
  public readonly product: Product;
  public readonly form: FormGroup;
  public readonly pageKey: string;
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
    this.pageKey = 'app-update-product';
    this.dynamicAlertService.clearAlertByKey(this.pageKey);
    this.uploadLabel = this.isUpdateWindow ? this.product.img : 'Завантажте зображення';
    const queryParams: { [key: string]: any } = {type: ProductType.APPLE, size: 10_000};
    this.productNames$ = this.productServiceName.getProductNames(queryParams).pipe(
      catchError(() => of(null)),
      map(page => page ? page.content.map(({id, name}) => ({value: id, label: name})) : [])
    );
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
      complete: () => this.spinnerService.hide()
    }
    if (this.isUpdateWindow) {
      this.productService.updateProduct(this.product.id, UpdateProductDto.fromObject(values)).subscribe(observer)
    } else {
      this.productService.createProduct(CreateProductDto.fromObject(values)).subscribe(observer);
    }
  }

  onClose(): void {
    this.ref.close();
  }

  onImgUploaded({ currentFiles }: { currentFiles: File[] }): void {
    const imgControl: AbstractControl = this.form.controls['img'];
    imgControl.setValue(currentFiles[0])
    this.uploadLabel = imgControl.value.name;
    if (this.fileUploader) {
      this.fileUploader.clear();
    }
  }

  private onSaveResponseHandler(response: Product | HttpErrorResponse): void {
    if (response instanceof HttpErrorResponse) {
      this.dynamicAlertService.pushSimpleAlert('Підчас створення продукції сталась помилка', this.pageKey);
      return;
    }
    const img: AbstractControl = this.form.controls['img'].value;
    if (img && img instanceof File) {
      const uploadObserver: Observer<void> = {
        next: () => this.ref.close(response),
        error: () => this.dynamicAlertService.pushSimpleAlert(
          'Підчас завантаження фото сталась помилка',
          this.pageKey
        ),
        complete: () => {}
      };
      this.productService.updateImage(response.id, img).subscribe(uploadObserver)
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
