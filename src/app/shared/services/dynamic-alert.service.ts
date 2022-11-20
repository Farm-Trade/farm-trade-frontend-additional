import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, Subject, throwError} from "rxjs";
import {DynamicAlert} from "../entities/alert/dynamic-alert.model";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {ParsedError} from "../entities/api/parsed-error.interface";

@Injectable({
  providedIn: 'root'
})
export class DynamicAlertService {
  constructor(private readonly messageService: MessageService) {
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    const parsedError: ParsedError = error.error;
    this.addErrorMessage(parsedError.message);
    return throwError(() => error);
  }

  public addSuccessMessage(message: string): void {
    this.messageService.add({ summary: 'Все успішно', detail: message, severity: 'success', key: 'tc'})
  }

  public addErrorMessage(message: string) {
    this.messageService.add({ summary: 'Відбулась помилка', detail: message, severity: 'error', key: 'tc'})
  }
}
