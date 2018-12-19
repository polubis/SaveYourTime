


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import * as OperationsActions from '../../store/operations/actions';
import { IFileToExtract } from "src/app/store/operations/reducers";
import { of } from "rxjs";
@Injectable()
export class OperationsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  tryPutOperation = this.actions$.ofType(OperationsActions.TRY_PUT_OPERATION).pipe(
    switchMap((action: OperationsActions.TryPutOperation) => {
      const fileToExtract: IFileToExtract = {
        [action.payload.name]: action.payload
      };
      return of(fileToExtract);
    }),
    map((extractedFiles: IFileToExtract) => {
        return {
          type: OperationsActions.PUT_OPERATION, payload: extractedFiles
        }
    })
  )

}
