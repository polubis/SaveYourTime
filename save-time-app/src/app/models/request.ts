export interface Settings {
  [domain: string]: RequestSetting;
}
export enum RequestTypes {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete'
}
export class RequestSetting {
  constructor(public url: string, public authorize?: boolean, public type: RequestTypes = RequestTypes.Get, public shouldShowError: boolean = true,
    public formData: boolean = false) {}
}
