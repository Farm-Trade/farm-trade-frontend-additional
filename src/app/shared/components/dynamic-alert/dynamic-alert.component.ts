import {Component, Input, OnInit} from '@angular/core';
import {DynamicAlertService} from "../../services/dynamic-alert.service";
import {Observable, of} from "rxjs";
import {DynamicAlert} from "../../entities/alert/dynamic-alert.model";

@Component({
  selector: 'app-dynamic-alert',
  templateUrl: './dynamic-alert.component.html',
  styleUrls: ['./dynamic-alert.component.scss']
})
export class DynamicAlertComponent implements OnInit {
  @Input()
  public key: string | undefined;
  public alert$: Observable<DynamicAlert | null>;

  constructor(
    private readonly dynamicAlertService: DynamicAlertService
  ) {
    this.alert$ = of(null);
  }

  ngOnInit(): void {
    if (this.key) {
      this.alert$ = this.dynamicAlertService.getAlertsByKey(this.key);
    }
  }

}
