import * as OperationsActions from './actions';
import { OperationState } from "src/app/models/operation-state";

export interface State {
  filesToExtract: IFileToExtract;
};

export interface IFileToExtract {
  [key: string]: File;
}

const initialState: State = {
  filesToExtract: null
};

export function operationsReducer(state = initialState, action: OperationsActions.OperationsActions){
    switch(action.type){
        case OperationsActions.PUT_OPERATION:
          return {
              ...state,
              filesToExtract: {...state.filesToExtract, ...action.payload}
          };
        default:
            return state;
    }
}

export const selectFilesToExtract = (state: State) => state.filesToExtract;
