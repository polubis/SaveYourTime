import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { RequestsService } from "src/app/services/requests.service";
import { Router } from "@angular/router";
import * as UserSettingsActions from './actions';
import { switchMap, map } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { ISalarySchema } from "src/app/containers/main/store/user-settings/reducers";
@Injectable()
export class UserSettingsEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private router: Router, private store: Store<AppState>) {
  }

  @Effect() tryGetUserSettings = this.actions$.ofType(UserSettingsActions.TRY_GET_USER_SETTINGS).pipe(
    switchMap((action: UserSettingsActions.TryGetUserSettings) => {
      return this.requestsService.execute('getUserSettings', null,
        () => this.store.dispatch(new UserSettingsActions.ChangeState(
          { key: 'isLoadingSettings', value: false }
        ))
      )
    }),
    map((response: {settings: any}) => {
      const { settings } = response;
      const salaryModal: boolean = settings === null;
      const salarySchema: ISalarySchema | boolean = settings !== null ?
        { salary: settings.salary, currency: settings.currency} : null;

      return {
        type: UserSettingsActions.FINISH_GET_USER_SETTINGS,
        payload: { salaryModal, salarySchema }
      }
    })
  )

  @Effect() tryAddSalarySchema = this.actions$.ofType(UserSettingsActions.TRY_ADD_SALARY_SCHEMA).pipe(
    switchMap((action: UserSettingsActions.TryAddSalarySchema) => {
      return this.requestsService.execute('addUserSettings', action.payload,
        () => this.store.dispatch(new UserSettingsActions.ChangeState(
          { key: 'isAddingSalarySchema', value: false}
        )))
    }),
    map((response: ISalarySchema) => {
      return {
        type: UserSettingsActions.FINISH_ADDING_SALARY_SCHEMA,
        payload: response
      };
    })
  )
}
