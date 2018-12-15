import { Injectable } from "@angular/core";
import { ValidationService } from "src/app/components/utils/form/validation.service";
import { Input, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";

export interface Validator {
  [name: string] : {
    exist?: boolean;
    minLength?: number;
    maxLength?: number;
    isLengthEqualTo?: number;
  };
}

export interface FormState {
  [name: string] : any;
}
export interface FormErrors {
  [name: string] : string;
}
export interface FormSettings {
  [name: string] : Setting;
}

export class Setting {
  constructor(public label?: string, public validators?: any, public type: string = 'text', public mode = 'input', public initialValue = '') {
  }
}

export class Form extends ValidationService {
  preview: any = "";
  @Input() isSubmiting;
  @Input() elementToEdit?: any;
  @Output() submiting = new EventEmitter<FormState>()
  formState: FormState;
  formErrors: FormErrors;
  formSettings: FormSettings;
  formStateKeys: string[];

  currentFocusedInput = '';
  isFormDirty = false;
  isErrorsInForm = false;
  isLoadingDataForForm = false;

  constructor(private settings: FormSettings = null) {
    super();
    if (settings) {
      this.createInitialState(settings);
    }
  }

  createInitialState(settings: FormSettings) {
    const formStateKeys = Object.keys(settings);
    const formState: FormState = {};
    const formErrors: FormErrors = {};
    const formSettings: FormSettings = {};

    formStateKeys.forEach(name => {
      const { initialValue } = settings[name];
      formState[name] = initialValue ? initialValue : '';
      formErrors[name] = '';
      formSettings[name] = {...settings[name]};

      if (formSettings[name].mode === 'file' && initialValue) {
        this.preview = initialValue;
      }
    });

    this.formSettings = formSettings;
    this.formStateKeys = formStateKeys;
    this.formState = formState;
    this.formErrors = formErrors;
  }

  putError(value: any, name: string) {
    const formErrors: FormErrors = { ...this.formErrors };
    formErrors[name] = super.runInputValidation(value, this.formSettings[name]);
    this.formErrors = formErrors;

    if (this.isFormDirty) {
      this.isErrorsInForm = super.checkIsFormContainsErrors(this.formErrors, this.formStateKeys);
    }
  }

  putValue(value: any, name: string) {
    const formState: FormState = { ...this.formState };
    formState[name] = value;
    this.formState = formState;
  }

  putValuesAndErrors(value: any, name: string) {
    this.putValue(value, name);
    this.putError(value, name);
  }

  input(e: any, name: string) {
    const { value } = e.target;
    this.putValuesAndErrors(value, name);
  }

  clearInputState(name: string) {
    const formState = {...this.formState};
    formState[name] = '';
    this.formState = formState;
    this.preview = "";
    this.putError('', name);
  }

  onFilePicked(e: Event, name: string) {
    this.isLoadingDataForForm = true;
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.putValue(file, name);
      this.putError(file, name);
      if (!this.formErrors[name]) {
        this.preview = reader.result;
      }
      this.isLoadingDataForForm = false;
    };
    reader.readAsDataURL(file);
  }

  focus(key: string) {
    this.currentFocusedInput = key;
  }

  blur() {
    this.currentFocusedInput = '';
  }

  submit(e) {
    e.preventDefault();
    if (!this.isFormDirty) {
      this.isFormDirty = true;
    }
    const result: {errors: FormErrors, isErrorsInForm: boolean} = super.validateOnSubmit(this.formState, this.formSettings, this.formStateKeys);
    this.isErrorsInForm = result.isErrorsInForm;
    this.formErrors = result.errors;

    if (!this.isErrorsInForm) {
      this.submiting.emit(this.formState);
    }
  }
}
