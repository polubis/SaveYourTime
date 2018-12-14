import { Input } from "@angular/core";
import { FormSettings } from "src/app/components/utils/form/form";

export class FormBase {
  constructor() {

  }
  putModelIntoFormOnEdit(model: any, formSettings: FormSettings): FormSettings {
    const formSettingsKeys: string[] = Object.keys(formSettings);
    const modelKeys: string[] = Object.keys(model);
    const newFormSettings: FormSettings = {...formSettings};
    const length = formSettingsKeys.length;
    for (let i = 0; i < length; i++) {
      const key = formSettingsKeys[i];
      newFormSettings[key].initialValue = model[key] ? model[key] : '';
    }
    return newFormSettings;
  }

  @Input() elementToEdit?;
  isSubmiting = false;
}
