import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { RequestsService } from "src/app/services/requests.service";
import { Router } from "@angular/router";
import * as UserSettingsActions from './actions';
import { switchMap, map } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
@Injectable()
export class UserSettingsEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private router: Router, private store: Store<AppState>) {
  }

  @Effect() tryGetSalary = this.actions$.ofType(UserSettingsActions.TRY_GET_USER_SETTINGS).pipe(
    switchMap((action: UserSettingsActions.TryGetUserSettings) => {
      return this.requestsService.execute('getUserSettings', null,
        () => this.store.dispatch(new UserSettingsActions.ChangeState(
          { key: 'isLoadingSettings', value: false }
        ))
      )
    }),
    map((response: any) => {
      return {
        type: UserSettingsActions.FINISH_GET_USER_SETTINGS,
        payload: { salary: 1000, salaryModal: true }
      }
    })
  )
}
