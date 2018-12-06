import { Injectable } from "@angular/core";
import { RequestSetting, Settings } from "src/app/models/request";
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
  }

  execute(settingKey: string, payload?: any, params?: string): Observable<any> {
    const { url, authorize, type } = this.settings[settingKey];

    return this.http.get(this.baseUrl + url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of();
      })
    );
  }
}
