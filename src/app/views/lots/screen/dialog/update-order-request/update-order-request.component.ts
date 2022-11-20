import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, finalize, map, Observable, Observer} from "rxjs";
import {MenuItem, SelectItem} from "primeng/api";
import {OrderRequest} from "../../../model/order-request.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../../../shared/services/dynamic-alert.service";
import {ProductNameService} from "../../../../../services/storage/product-name.service";
import {SpinnerService} from "../../../../../services/shared/spinner.service";
import {OrderRequestService} from "../../../../../services/log/order-request.service";
import {ProductType} from "../../../../storage/enums/product-type.enum";
import {OrderCreateStep} from "../../../enum/order-create-step.enum";
import {CreateUpdateOrderRequestDto} from "../../../model/create-update-order-request-dto.model";
import {DateUtil} from "../../../../../utils/date.util";
import {ProductName} from "../../../../storage/model/product-name.model";

@Component({
  selector: 'app-update-order-request',
  templateUrl: './update-order-request.component.html',
  styleUrls: ['./update-order-request.component.scss']
})
export class UpdateOrderRequestComponent implements OnInit {
  public productNames: SelectItem[] = [];
  public currentStep$: Observable<OrderCreateStep>;
  public currentForm$: Observable<FormGroup>;
  public orderRequestFromForm: OrderRequest | undefined;
  public readonly steps = OrderCreateStep;
  public readonly orderRequest: OrderRequest;
  public readonly form: FormGroup;
  public readonly items: MenuItem[];
  public readonly minDate: Date;
  private readonly isUpdateWindow: boolean;
  private readonly _currentStep$: BehaviorSubject<OrderCreateStep>;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly dynamicAlertService: DynamicAlertService,
    private readonly orderRequestService: OrderRequestService,
    private readonly productServiceName: ProductNameService,
    private readonly spinnerService: SpinnerService
  ) {
    this.orderRequest = this.config.data.orderRequest;
    this.isUpdateWindow = this.config.data.isUpdateWindow;
    this._currentStep$ = new BehaviorSubject<OrderCreateStep>(OrderCreateStep.PRODUCT_QUANTITY_AND_SIZE);
    this.currentStep$ = this._currentStep$.asObservable();
    this.currentForm$ = this._currentStep$.asObservable().pipe(map(this.currentFormHandler.bind(this)));
    this.items = [
      {label: 'Продукт, Кількість та Розмір'},
      {label: 'Ціни та Нотатки'},
      {label: 'Дати'},
      {label: 'Підтвердження'}
    ];
    this.minDate = new Date();
    this.form = this.getFrom();
    const queryParams: { [key: string]: any } = {type: ProductType.APPLE, size: 10_000};
    this.productServiceName.getProductNamesAsSelectedItems(queryParams).subscribe(productNames => this.productNames = productNames)
  }

  public ngOnInit(): void {
  }

  public onClose(): void {
    this.ref.close();
  }

  public onNext(): void {
    const currentStep: OrderCreateStep = this._currentStep$.getValue() + 1;
    this._currentStep$.next(currentStep);
    if (currentStep === OrderCreateStep.REVIEW) {
      this.orderRequestFromForm = this.buildOrderRequestFromForm();
    }
  }

  public onBack(): void {
    this._currentStep$.next(this._currentStep$.getValue() - 1);
  }

  public onSave(): void {
    this.spinnerService.show();

    let saver: Observable<OrderRequest>;
    const orderRequest: CreateUpdateOrderRequestDto = this.fromForm();

    if (this.isUpdateWindow) {
      saver = this.orderRequestService.updateOrderRequest(this.orderRequest.id, orderRequest);
    } else {
      saver = this.orderRequestService.createOrderRequest(orderRequest);
    }
    const observer: Observer<OrderRequest> = {
      next: orderRequest => this.ref.close(orderRequest),
      error: () => {
      },
      complete: () => {
      },
    };
    saver.pipe(
      finalize(() => this.spinnerService.hide()),
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService))
    ).subscribe(observer);
  }

  private fromForm(): CreateUpdateOrderRequestDto {
    const productQuantityAndSize = {...this.receiveForm('productQuantityAndSize').value};
    const pricingAndNotes = {...this.receiveForm('pricingAndNotes').value};
    const dates = {...this.receiveForm('dates').value};

    const orderRequest: CreateUpdateOrderRequestDto = {
      quantity: productQuantityAndSize.quantity,
      unitPrice: pricingAndNotes.unitPrice,
      sizeFrom: productQuantityAndSize.sizeFrom,
      notes: pricingAndNotes.notes,
      unitPriceUpdate: pricingAndNotes.unitPriceUpdate,
      productName: productQuantityAndSize.productName,
      loadingDate: DateUtil.toLocalDateTimeFormat(dates.loadingDate),
      auctionEndDate: DateUtil.toLocalDateTimeFormat(dates.auctionEndDate)
    } as CreateUpdateOrderRequestDto;
    return CreateUpdateOrderRequestDto.fromObject(orderRequest);
  }

  private buildOrderRequestFromForm(): OrderRequest {
    const createUpdateOrderRequestDto: CreateUpdateOrderRequestDto = this.fromForm();
    const productName: ProductName = this.productNames
      .filter(({ value }) => value === createUpdateOrderRequestDto.productName)
      .map(productName => ({ name: productName.label, id: productName.value } as ProductName))[0];
    return OrderRequest.fromCreateUpdateOrderRequestDto(createUpdateOrderRequestDto, productName);
  }

  private currentFormHandler(step: OrderCreateStep): FormGroup {
    switch (step) {
      case OrderCreateStep.PRODUCT_QUANTITY_AND_SIZE:
        return this.receiveForm('productQuantityAndSize');
      case OrderCreateStep.PRICING_AND_NOTES:
        return this.receiveForm('pricingAndNotes');
      case OrderCreateStep.DATES:
        return this.receiveForm('dates');
      case OrderCreateStep.REVIEW:
        return this.form;
      default:
        return {valid: false} as FormGroup;
    }
  }

  private receiveForm(formKey: 'productQuantityAndSize' | 'pricingAndNotes' | 'dates'): FormGroup {
    return this.form.controls[formKey] as FormGroup;
  }

  private getFrom(): FormGroup {
    const productQuantityAndSize: FormGroup = this.fb.group({
      productName: [this.orderRequest.productName ? this.orderRequest.productName.id : null, [Validators.required]],
      quantity: [this.orderRequest.quantity || null, [Validators.required]],
      sizeFrom: [this.orderRequest.sizeFrom || null, [Validators.required]],
    });
    const pricingAndNotes: FormGroup = this.fb.group({
      unitPrice: [this.orderRequest.unitPrice || null, [Validators.required]],
      unitPriceUpdate: [this.orderRequest.unitPriceUpdate || null, [Validators.required]],
      notes: [this.orderRequest.notes || null, []]
    });
    const dates: FormGroup = this.fb.group({
      loadingDate: [this.orderRequest.loadingDate ? new Date(this.orderRequest.loadingDate) : null, [Validators.required]],
      auctionEndDate: [this.orderRequest.auctionEndDate ? new Date(this.orderRequest.auctionEndDate) : null, [Validators.required]]
    });

    return this.fb.group({productQuantityAndSize, pricingAndNotes, dates});
  }
}
