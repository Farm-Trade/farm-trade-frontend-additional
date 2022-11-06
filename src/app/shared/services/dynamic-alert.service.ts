import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {DynamicAlert} from "../entities/alert/dynamic-alert.model";

@Injectable({
  providedIn: 'root'
})
export class DynamicAlertService {
  public readonly alerts$: Observable<{[key: string]: DynamicAlert}>;
  private readonly _alerts$: BehaviorSubject<{[key: string]: DynamicAlert}>;

  constructor() {
    this._alerts$ = new BehaviorSubject<{[key: string]: DynamicAlert}>({});
    this.alerts$ = this._alerts$.asObservable();
  }

  public pushAlert(alert: DynamicAlert, key: string, removeIn: number = 0): void {
    const oldAlerts: {[key: string]: DynamicAlert} = this._alerts$.getValue();
    oldAlerts[key] = alert;
    this._alerts$.next(oldAlerts);

    if (removeIn) {
      setTimeout(() => {
        if (oldAlerts[key]) {
          this.clearAlertByKey(key);
        }
      }, removeIn);
    }
  }

  public pushSimpleAlert(message: string, key: string, removeIn: number = 0, ): void {
    const alert: DynamicAlert = new DynamicAlert(message);
    this.pushAlert(alert, key, removeIn);
  }

  public getAlertsByKey(key: string): Observable<DynamicAlert> {
    return this.alerts$.pipe(map(alerts => alerts[key]));
  }

  public clearAlertByKey(key: string): void {
    const oldAlerts: {[key: string]: DynamicAlert} = this._alerts$.getValue();
    if (oldAlerts[key]) {
      delete oldAlerts[key];
      this._alerts$.next(oldAlerts);
    }
  }
}
