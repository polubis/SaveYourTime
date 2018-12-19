import { Action } from "@ngrx/store";
import { OperationState } from "src/app/models/operation-state";
import { IFileToExtract } from "src/app/store/operations/reducers";


export const TRY_PUT_OPERATION = "[Operations] TRY_PUT_OPERATION";
export const PUT_OPERATION = "[Operations] PUT_OPERATION";

export class TryPutOperation {
  readonly type = TRY_PUT_OPERATION;
  constructor(public payload: File) {
  }
}

export class PutOperation {
  readonly type = PUT_OPERATION;
  constructor(public payload: IFileToExtract) {
  }
}

export type OperationsActions = PutOperation | TryPutOperation;
