import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }


  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof HttpErrorResponse) {
      errMsg = error.error.message;
    }else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return throwError(errMsg);
  }
}
