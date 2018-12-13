import { Input } from "@angular/core";
import { FormSettings } from "src/app/components/utils/form/form";

export class FormBase {
  constructor() {

  }
  putModelIntoFormOnEdit(model: any, formSettings: FormSettings): FormSettings {
    const newFormSettings: FormSettings = {};
    const keys = Object.keys(model);
    const formSettingsKeys = Object.keys(formSettings);
    for (let i = 0; i < keys.length; i++) {
      const keyToAdd = formSettingsKeys.find(x => x === keys[i]);

      if (keyToAdd) {
        newFormSettings[keyToAdd] = formSettings[keyToAdd];
        newFormSettings[keyToAdd].initialValue = model[keyToAdd];
      }
    }
    return newFormSettings;
  }

  @Input() elementToEdit?;
  isSubmiting = false;
}
