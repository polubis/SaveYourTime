


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import * as OperationsActions from '../../store/operations/actions';
import { IFileToExtract } from "src/app/store/operations/reducers";
import { of } from "rxjs";
import { getFilesToExtract } from "src/app/store";
@Injectable()
export class OperationsEffects {
  keyToRemove: string;
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
        };
    })
  )

  @Effect()
  tryRemoveOperation = this.actions$.ofType(OperationsActions.TRY_REMOVE_OPERATION).pipe(
    switchMap((action: OperationsActions.TryRemoveOperation) => {
      this.keyToRemove = action.payload;
      return this.store.select(getFilesToExtract).pipe(take(1));
    }),
    map((filesToExtract: IFileToExtract) => {
      console.log(filesToExtract);
      const cutedFiles: IFileToExtract = {};
      const keys = Object.keys(filesToExtract);
      for(let key in keys) {
        const extFileKey = keys[key];
        if (extFileKey !== this.keyToRemove) {
          cutedFiles[extFileKey] = filesToExtract[extFileKey];
        }
      }
      console.log(cutedFiles, filesToExtract);

      return {
        type: OperationsActions.SET_OPERATIONS, payload: cutedFiles
      };
    })
  )

}


// const { id, currentOperations } = action.payload;
// const filesToExtract: IFileToExtract = {};
// const keys = Object.keys(currentOperations);
// for(let key in keys) {
//   const extFileKey = keys[key];
//   if (extFileKey !== id) {
//     filesToExtract[extFileKey] = currentOperations[extFileKey];
//   }
// }
// console.log(filesToExtract);
// return of(filesToExtract);
