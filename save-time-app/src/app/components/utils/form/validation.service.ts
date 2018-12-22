import { Validator, Setting, FormState, FormErrors, FormSettings } from "src/app/components/utils/form/form";

export class Validators {

  protected isPicture(file: File) {
    return file.size ? ['image/jpg', 'image/jpeg', 'image/png'].findIndex(format => format === file.type) !== -1 : true;
  }

  protected isNotInvalidFileFormat(file: File, formats: string[]) {
    return file.size ? formats.findIndex(format => format === file.type) !== -1 : true;
  }

  protected isNotEmptyString(value: any) {
    return value !== '';
  }
  protected minLength(length: any, limit: number) {
    return length > 0 ? length > limit : true;
  }

  protected maxLength(length: any, limit: number) {
    return length < limit;
  }

  protected isFileWithCorrectSize(file: File, allowedSize: number) {
    return file.size ? file.size < allowedSize : true;
  }

  protected isLengthEqualTo(length: any, limit: number) {
    return length === limit;
  }

  protected isNotOnBlackList(file: File, blackList: string[]) {
    return file.size ? blackList.findIndex(x => x === file.name) === -1 : true;
  }

}

export class ValidationService extends Validators {
  constructor() {
    super();
  }
  private errorsStagger = {
    isNotEmptyString: (title) => `${title} field cannot be empty`,
    minLength: (title, limit) => `${title} field must have more than ${limit} characters`,
    maxLength: (title, limit) => `${title} field cannot have more than ${limit} characters`,
    isLengthEqualTo: (title, limit) => `${title} field must have ${limit} characters`,
    isPicture: (title) => `${title} field must be graphic format`,
    isFileWithCorrectSize: (title, allowedSize) => `${title} field must have size less than ${allowedSize} bytes`
  };

  private validationStagger = {
    isNotEmptyString: (value) => super.isNotEmptyString(value),
    minLength: (value, limit) => super.minLength(value.length, limit),
    maxLength: (value, limit) => super.maxLength(value.length, limit),
    isLengthEqualTo: (value, limit) => super.isLengthEqualTo(value.length, limit),
    isPicture: (file) => super.isPicture(file),
    isFileWithCorrectSize: (file, limit) => super.isFileWithCorrectSize(file, limit)
  };

  protected runInputValidation(value: any, setting: Setting) {
    if (setting.validators) {
      const { label, validators } = setting;
      const validatorsKeys = Object.keys(validators);
      const lengthOfKeys = validatorsKeys.length;
      let isValid = true;
      for (let i = 0; i < lengthOfKeys; i++) {
        const key: string = validatorsKeys[i];
        const result: boolean = this.validationStagger[key](value, validators[key]);
        if (!result) {
          return this.errorsStagger[key](label, validators[key]);
        }
      }
    }

    return '';
  }

  protected checkIsFormContainsErrors(formErrors: FormErrors, formStateKeys: string[]) {
    for (let key in formStateKeys) {
      const name = formStateKeys[key];
      if (formErrors[name] !== '') {
        return true;
      }
    }
    return false;
  }

  protected validateOnSubmit(formState: FormState, formSettings: FormSettings, formStateKeys: string[]) {
    const errors: FormErrors = {};
    let isErrorsInForm = false;
    formStateKeys.forEach(key => {
      errors[key] = this.runInputValidation(formState[key], formSettings[key]);
      if (errors[key] !== '') {
        isErrorsInForm = true;
      }
    });
    return {errors, isErrorsInForm};
  }
}
