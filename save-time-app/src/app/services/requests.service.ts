import { Injectable } from "@angular/core";
import { RequestSetting, Settings, RequestTypes } from "src/app/models/request";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, take, tap, map, mergeMap, filter } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { Notification } from '../models/notification';
import { TryPushNotification } from '../store/notifications/actions';
import { getNotifications, getToken } from '../store/index';
import { TryLogOut } from "src/app/store/users/actions";
import { environment } from '../../environments/environment';
@Injectable({providedIn: 'root'})
export class RequestsService {

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }
  baseUrl = environment.baseUrl;

  succesfullMessages = {
    register: 'Your account has been succesfully created',
    addProduct: 'Product has been succesfully added',
    editProduct: 'Product has been succesfully edited',
    deleteProduct: "Product has been succesfully deleted",
    createProductCategory: "Category has been succesfully added",
    removeCategory: 'Category has been succesfully removed',
    editCategory: 'Category has been succesfully edited',
    uploadAvatar: 'User avatar has been succesfully uploaded'
  }

  settings: Settings = {
    getCategories: new RequestSetting('product/categories'),
    createProductCategory: new RequestSetting('product/categories', false, RequestTypes.Post),
    editCategory: new RequestSetting('product/categories', false, RequestTypes.Patch),
    removeCategory: new RequestSetting('product/categories/', false, RequestTypes.Delete),

    products: new RequestSetting('products'),
    addProduct: new RequestSetting('products', false, RequestTypes.Post, true, true),
    editProduct: new RequestSetting('products/', false, RequestTypes.Patch, true, true),
    deleteProduct: new RequestSetting('products/', false, RequestTypes.Delete),
    rateProduct: new RequestSetting('products/rate/', false, RequestTypes.Patch, false, false),

    getLoggedUserData: new RequestSetting('users'),
    register: new RequestSetting('users/register', false, RequestTypes.Post),
    login: new RequestSetting('users/login', false, RequestTypes.Post),
    uploadAvatar: new RequestSetting('users/avatar', false, RequestTypes.Patch, true, true)
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

    const request: Observable<any> = this.prepareRequestParams(requestPath, type,
        formData ? this.mapPayloadIntoFormData(payload) : payload, authorize);

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

    if (error.status === 401) {
      // this.store.dispatch(new TryLogOut());
      return 'You access here is not allowed. Try get permisions first';
    }

    if(error.error.error) {
      return error.error.error;
    }

    if (error.status === 400) {
      return 'Request parameters not found. Probably wrong request path';
    }


    return 'Ups something goes wrong...'
  }

  prepareRequestParams(requestPath: string, type: string, payload?: any, authorize?: boolean): Observable<any> {

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
