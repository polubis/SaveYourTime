



import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as UsersActions from '../../store/users/actions';
import { switchMap, map } from "rxjs/operators";
import { RequestsService } from "src/app/services/requests.service";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
@Injectable()
export class UsersEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private store: Store<AppState>) {

  }
  @Effect()
  register = this.actions$.ofType(UsersActions.START_REGISTER).pipe(
    switchMap((action: UsersActions.StartRegister) => {
      return this.requestsService.execute('register', action.payload,
        () => this.store.dispatch(new UsersActions.SetRegisterState(false))
      );
    }),
    map((response: any) => {
      console.log(response)
      return {
        type: UsersActions.SET_REGISTER_STATE,
        payload: true
      };
    })
  );
}
