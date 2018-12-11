


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { switchMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { RequestsService } from "src/app/services/requests.service";
import { Product } from "src/app/models/product";
import * as NotificationsActions from '../../store/notifications/actions';
@Injectable()
export class NotificationsReducer {
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService
  ) {}
}
