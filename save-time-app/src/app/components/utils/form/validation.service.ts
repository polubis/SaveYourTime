import { Validator, Setting, FormState, FormErrors, FormSettings } from "src/app/components/utils/form/form";

export class ValidationService {
  private readonly allowedPicturesFormats: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
  private errorsStagger = {
    isNotEmptyString: (title) => `${title} field cannot be empty`,
    minLength: (title, limit) => `${title} field must have more than ${limit} characters`,
    maxLength: (title, limit) => `${title} field cannot have more than ${limit} characters`,
    isLengthEqualTo: (title, limit) => `${title} field must have ${limit} characters`,
    isPicture: (title) => `${title} field must be graphic format`,
    isFileWithCorrectSize: (title, allowedSize) => `${title} field must have size less than ${allowedSize} bytes`
  };

  private validationStagger = {
    isNotEmptyString: (value) => this.isNotEmptyString(value),
    minLength: (value, limit) => this.minLength(value.length, limit),
    maxLength: (value, limit) => this.maxLength(value.length, limit),
    isLengthEqualTo: (value, limit) => this.isLengthEqualTo(value.length, limit),
    isPicture: (file) => this.isPicture(file),
    isFileWithCorrectSize: (file, limit) => this.isFileWithCorrectSize(file, limit)
  };

  private isNotEmptyString(value: any) {
    return value !== '';
  }
  private minLength(length: any, limit: number) {
    return length > limit;
  }

  private maxLength(length: any, limit: number) {
    return length < limit;
  }

  private isPicture(file: File) {
    return file.size ? this.allowedPicturesFormats.findIndex(format => format === file.type) !== -1 : true;
  }

  private isFileWithCorrectSize(file: File, allowedSize: number) {
    return file.size ? file.size < allowedSize : true;
  }

  private isLengthEqualTo(length: any, limit: number) {
    return length === limit;
  }
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
