
export class OperationState {
  constructor(public isProcessing: boolean, public finishStatus: string,
    public value: number, public description: string) {

  }
}
export interface Operation {
  [key: string]: OperationState;
};
