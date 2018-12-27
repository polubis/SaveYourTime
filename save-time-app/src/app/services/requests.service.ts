import { Injectable } from "@angular/core";
import { RequestSetting, Settings, RequestTypes } from "src/app/models/request";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, take, tap, map, mergeMap, filter } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { Notification } from '../models/notification';
import { TryPushNotification } from '../store/notifications/actions';
import { getNotifications } from '../store/index';

@Injectable({providedIn: 'root'})
export class RequestsService {
  baseUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  succesfullMessages = {
    register: 'Your account has been succesfully created',
    addProduct: 'Product has been succesfully added',
    editProduct: 'Product has been succesfully edited',
    deleteProduct: "Product has been succesfully deleted",
    createProductCategory: "Category has been succesfully added",
    removeCategory: 'Category has been succesfully removed'
  }

  settings: Settings = {
    getCategories: new RequestSetting('product/categories'),
    createProductCategory: new RequestSetting('product/categories', false, RequestTypes.Post),
    removeCategory: new RequestSetting('product/categories/', false, RequestTypes.Delete),

    products: new RequestSetting('products'),
    addProduct: new RequestSetting('products', false, RequestTypes.Post, true, true),
    editProduct: new RequestSetting('products/', false, RequestTypes.Patch, true, true),
    deleteProduct: new RequestSetting('products/', false, RequestTypes.Delete),
    rateProduct: new RequestSetting('products/rate/', false, RequestTypes.Patch, false, false),

    register: new RequestSetting('users/register', false, RequestTypes.Post),
  }

  mapPayloadIntoFormData(payload: any) {
    const keys = Object.keys(payload);
    const formData = new FormData();
    keys.forEach(element => {
      formData.set(element, payload[element]);
    });
    return formData;
  }

  execute(settingKey: string, payload?: any, callback?: any, params: string = ''): Observable<any> {
    const { url, authorize, type, shouldShowError, formData } = this.settings[settingKey];
    const requestPath: string = this.baseUrl + url + params;

    const request: Observable<any> = this.prepareRequestParams(requestPath, type, formData ? this.mapPayloadIntoFormData(payload) : payload);

    return request.pipe(
      mergeMap((response: any) => {
        if (this.succesfullMessages[settingKey]) {
          this.store.dispatch(new TryPushNotification(
            new Notification(this.succesfullMessages[settingKey], 'ok', settingKey)
          ));
        }
        return of(response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (shouldShowError) {
          this.store.dispatch(new TryPushNotification(
            new Notification(this.handleError(error), 'error', settingKey)
          ));
        }
        if(callback) callback();

        return of(error);
      }),
      filter((response: any) => {
        if (response === null) {
          return true;
        }
        return (response.status === null || response.status === undefined);
      })
    );
  }

  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'There is a network problem. Check internet connection and try again';
    }
    if(error.error.error) {
      return error.error.error;
    }

    if (error.status === 400) {
      return 'Request parameters not found. Probably wrong request path';
    }

    if (error.status === 401) {
      return 'You access here is not allowed. Try get permisions first';
    }

    return 'Ups something goes wrong...'
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
