import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {finalize} from "rxjs";
import {SpinnerService} from "../../../../services/shared/spinner.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusinessDetails} from "../../model/business-details.model";
import {UpdateBusinessDetailsDto} from "../../model/update-business-details-dto.model";
import {DynamicAlertService} from "../../../../shared/services/dynamic-alert.service";
import {SelectItem} from "primeng/api";
import {PaymentType} from "../../enum/payment-type.enum";

@Component({
  selector: 'app-user-business-details',
  templateUrl: './user-business-details.component.html',
  styleUrls: ['./user-business-details.component.scss']
})
export class UserBusinessDetailsComponent implements OnInit, AfterViewInit {
  public businessDetails: BusinessDetails | undefined;
  public readonly form: FormGroup;
  public readonly paymentOptions: SelectItem[];
  constructor(
    private readonly userService: UserService,
    private readonly spinnerService: SpinnerService,
    private readonly fb: FormBuilder,
    private readonly alertService: DynamicAlertService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.paymentOptions = [{ value: PaymentType.CARD, label: 'Картка' }, { value: PaymentType.CASH, label: 'Готівка' }];
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      paymentType: [null, [Validators.required]],
    });
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public ngOnInit(): void {
    this.onLoad();
  }

  public refreshForm(): void {
    if (!this.businessDetails) {
      return;
    }
    const { name, address, paymentType }: BusinessDetails = this.businessDetails;
    this.form.controls['name'].patchValue(name);
    this.form.controls['address'].patchValue(address);
    this.form.controls['paymentType'].patchValue(paymentType);
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  public update(): void {
    const updateBusinessDetailsDto: UpdateBusinessDetailsDto = UpdateBusinessDetailsDto.fromObject(
      {...this.form.value}
    );
    this.spinnerService.show();
    this.userService.updateBusinessDetails(updateBusinessDetailsDto).pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe(businessDetails => {
      this.businessDetails = businessDetails;
      this.alertService.addSuccessMessage("Данні про ваше підприємство оновлено");
    });
  }
  private onLoad(): void {
    this.spinnerService.show();
    this.userService.getBusinessDetails().pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe(businessDetails => {
      this.businessDetails = businessDetails;
      this.refreshForm();
    });
  }
}
