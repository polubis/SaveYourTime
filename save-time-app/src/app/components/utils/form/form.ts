import { Injectable } from "@angular/core";
import { ValidationService } from "src/app/components/utils/form/validation.service";
import { Input, EventEmitter, Output } from "@angular/core";

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
  @Input() isSubmiting;
  @Output() submiting = new EventEmitter<FormState>()
  formState: FormState;
  formErrors: FormErrors;
  formSettings: FormSettings;
  formStateKeys: string[];

  currentFocusedInput = -1;
  isFormDirty = false;
  isErrorsInForm = false;

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
      const { initialValue } = settings;
      formState[name] = initialValue ? initialValue : '';
      formErrors[name] = '';
      formSettings[name] = {...settings[name]};
    });

    this.formSettings = formSettings;
    this.formStateKeys = formStateKeys;
    this.formState = formState;
    this.formErrors = formErrors;
  }

  input(e: any, name: string) {
    const { value } = e.target;
    const setting = this.formSettings[name];
    const formState = {...this.formState};
    const formErrors = {...this.formErrors};
    formState[name] = value;
    formErrors[name] = super.isInputValid(value, setting);
    this.formErrors = formErrors;
    this.formState = formState;

    if (this.isFormDirty) {
      this.isErrorsInForm = super.checkIsFormContainsErrors(this.formErrors, this.formStateKeys);
    }
  }

  focus(index: number) {
    this.currentFocusedInput = index;
  }

  blur() {
    this.currentFocusedInput = -1;
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
