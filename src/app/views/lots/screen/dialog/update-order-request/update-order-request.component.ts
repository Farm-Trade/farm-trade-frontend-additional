import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, finalize, map, Observable, Observer, switchMap} from "rxjs";
import {MenuItem, SelectItem} from "primeng/api";
import {OrderRequest} from "../../../model/order-request.model";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicAlertService} from "../../../../../shared/services/dynamic-alert.service";
import {ProductNameService} from "../../../../../services/storage/product-name.service";
import {SpinnerService} from "../../../../../services/shared/spinner.service";
import {OrderRequestService} from "../../../../../services/log/order-request.service";
import {ProductType} from "../../../../storage/enums/product-type.enum";
import {OrderCreateStep} from "../../../enum/order-create-step.enum";
import {CreateUpdateOrderRequestDto} from "../../../model/create-update-order-request-dto.model";
import {ProductName} from "../../../../storage/model/product-name.model";
import {DateUtil} from "../../../../../utils/date.util";

@Component({
  selector: 'app-update-order-request',
  templateUrl: './update-order-request.component.html',
  styleUrls: ['./update-order-request.component.scss']
})
export class UpdateOrderRequestComponent implements OnInit {
  public productNames: SelectItem[] = [];
  public currentStep$: Observable<OrderCreateStep>;
  public currentForm$: Observable<FormGroup>;
  public orderRequestFromForm: CreateUpdateOrderRequestDto | undefined;
  public selectedProductName: string;
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
    this._currentStep$ = new BehaviorSubject<OrderCreateStep>(OrderCreateStep.PRODUCT_AND_QUANTITY);
    this.currentStep$ = this._currentStep$.asObservable();
    this.currentForm$ = this._currentStep$.asObservable().pipe(map(this.currentFormHandler.bind(this)));
    this.items = [
      {label: 'Кількість та Ціни'},
      {label: 'Продукт та Нотатки'},
      {label: 'Дати'},
      {label: 'Підтвердження'}
    ];
    this.minDate = new Date();
    this.selectedProductName = this.orderRequest.id ? this.orderRequest.productName.name : '';
    this.form = this.getFrom();
    const queryParams: { [key: string]: any } = {type: ProductType.APPLE, size: 10_000};
    this.productServiceName.getProductNamesAsSelectedItems(queryParams).subscribe(productNames => this.productNames = productNames)
    this.receiveForm('productAndQuantity').controls['productName'].valueChanges.pipe(
      map(id => this.productNames.find(({value}) => value === id))
    ).subscribe(productName => this.selectedProductName = productName?.label || '');
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
      this.orderRequestFromForm = this.fromForm(true);
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
      error: () => {},
      complete: () => {},
    };
    saver.pipe(
      finalize(() => this.spinnerService.hide()),
      catchError(this.dynamicAlertService.handleError.bind(this.dynamicAlertService))
    ).subscribe(observer);
  }

  private fromForm(full: boolean = false): CreateUpdateOrderRequestDto {
    this.form.enable()
    const productAndQuantity = {...this.receiveForm('productAndQuantity').value};
    const pricingAndNotes = {...this.receiveForm('pricingAndNotes').value};
    const dates = {...this.receiveForm('dates').value};
    this.updateDisabledFields(this.form);

    const orderRequest: CreateUpdateOrderRequestDto = {
      quantity: productAndQuantity.quantity,
      unitPrice: pricingAndNotes.unitPrice,
      ultimatePrice: pricingAndNotes.ultimatePrice,
      notes: pricingAndNotes.notes
    } as CreateUpdateOrderRequestDto;
    if (!this.isUpdateWindow || full) {
      orderRequest.unitPriceUpdate = pricingAndNotes.unitPriceUpdate;
      orderRequest.productName = productAndQuantity.productName;
      orderRequest.loadingDate = DateUtil.toLocalDateTimeFormat(dates.loadingDate);
      orderRequest.auctionEndDate = DateUtil.toLocalDateTimeFormat(dates.auctionEndDate);
    }
    return CreateUpdateOrderRequestDto.fromObject(orderRequest);
  }

  private currentFormHandler(step: OrderCreateStep): FormGroup {
    switch (step) {
      case OrderCreateStep.PRODUCT_AND_QUANTITY:
        return this.receiveForm('productAndQuantity');
      case OrderCreateStep.PRICING_AND_NOTES:
        return this.receiveForm('pricingAndNotes');
      case OrderCreateStep.DATES:
        return this.isUpdateWindow ? {valid: true} as FormGroup : this.receiveForm('dates');
      case OrderCreateStep.REVIEW:
        return this.form;
      default:
        return {valid: false} as FormGroup;
    }
  }

  private receiveForm(formKey: 'productAndQuantity' | 'pricingAndNotes' | 'dates'): FormGroup {
    return this.form.controls[formKey] as FormGroup;
  }

  private getFrom(): FormGroup {
    const productAndQuantity: FormGroup = this.fb.group({
      productName: [this.orderRequest.productName ? this.orderRequest.productName.id : null, [Validators.required]],
      quantity: [this.orderRequest.quantity || null, [Validators.required]]
    });
    const pricingAndNotes: FormGroup = this.fb.group({
      unitPrice: [this.orderRequest.unitPrice || null, [Validators.required]],
      unitPriceUpdate: [this.orderRequest.unitPriceUpdate || null, [Validators.required]],
      ultimatePrice: [this.orderRequest.ultimatePrice || null, [Validators.required]],
      notes: [this.orderRequest.notes || null, []]
    });
    const dates: FormGroup = this.fb.group({
      loadingDate: [this.orderRequest.loadingDate ? new Date(this.orderRequest.loadingDate) : null, [Validators.required]],
      auctionEndDate: [this.orderRequest.auctionEndDate ? new Date(this.orderRequest.auctionEndDate) : null, [Validators.required]]
    });
    const builtForm: FormGroup = this.fb.group({ productAndQuantity, pricingAndNotes, dates });

    this.updateDisabledFields(builtForm);

    return builtForm;
  }

  private updateDisabledFields(from: FormGroup): void {
    if (this.isUpdateWindow) {
      const productAndQuantityDisableField: string[] = ['productName'];
      const pricingAndNotesDisableField: string[] = ['unitPriceUpdate'];
      const datesDisableField: string[] = ['loadingDate', 'auctionEndDate'];
      productAndQuantityDisableField.forEach(field => (from.controls['productAndQuantity'] as FormGroup).controls[field].disable());
      pricingAndNotesDisableField.forEach(field => (from.controls['pricingAndNotes'] as FormGroup).controls[field].disable());
      datesDisableField.forEach(field => (from.controls['dates'] as FormGroup).controls[field].disable());
    }
  }

}
