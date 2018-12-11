import { Injectable } from "@angular/core";
import { RequestSetting, Settings, RequestTypes } from "src/app/models/request";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class RequestsService {
  baseUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {
  }
  settings: Settings = {
    products: new RequestSetting('products'),
    register: new RequestSetting('register', false, RequestTypes.Post)
  }

  execute(settingKey: string, payload?: any, onErrorFunction?: any, params: string = ''): Observable<any> {
    const { url, authorize, type } = this.settings[settingKey];
    const requestPath: string = this.baseUrl + url + params;

    const request: Observable<any> = this.prepareRequestParams(requestPath, type, payload);

    return request.pipe(
      catchError((error: HttpErrorResponse) => {
        onErrorFunction();
        return of();
      })
    );
  }

  prepareRequestParams(requestPath: string, type: string, payload?: any): Observable<any> {
    switch(type){
      case RequestTypes.Post:
        return this.http.post(requestPath, payload);
      case RequestTypes.Patch:
        return this.http.patch(requestPath, payload);
      case RequestTypes.Delete:
        return this.http.delete(requestPath);
      default:
        return this.http.get(requestPath);
    }
  }
}
