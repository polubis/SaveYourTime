import * as ExtractionsActions from './actions';

export interface State {
  filesToExtract: IFileToExtract;
  extractedFiles: IExtractedFiles;
};

export interface IFileToExtract {
  [key: string]: File;
}

export interface IExtractedFiles {
  [key: string]: string;
}

const initialState: State = {
  filesToExtract: null,
  extractedFiles: null
};

export function extractionsReducer(state = initialState, action: ExtractionsActions.ExtractionsActions){
    switch(action.type){
      case ExtractionsActions.PUT_EXTRACTION:
        return {
          ...state,
          filesToExtract: {...state.filesToExtract, ...action.payload}
        };
      case ExtractionsActions.SET_EXTRACTIONS:
        return {
          ...state,
          filesToExtract: action.payload.filesToExtract,
          extractedFiles: action.payload.extractedFiles
        }
      case ExtractionsActions.PUT_EXTRACTED_FILE:
        return {
          ...state,
          extractedFiles: {...state.extractedFiles, ...action.payload }
        }
      default:
        return state;
    }
}

export const selectFilesToExtract = (state: State) => state.filesToExtract;
export const selectExtractedFiles = (state: State) => state.extractedFiles;
