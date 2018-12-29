import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBase } from "src/app/services/form-base";
import { FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import { TryAddSalarySchema } from "src/app/containers/main/store/user-settings/actions";
import { Store } from "@ngrx/store";
import { FeatureState } from "src/app/containers/main/store/user-settings/reducers";
import { getIsAddingSalarySchema } from "src/app/containers/main/store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent extends FormBase implements OnInit, OnDestroy {
  salarySettings: FormSettings = {
    salary: new Setting('salary', { isNotEmptyString: true, money: true }, 'number'),
    currency: new Setting('currency', {}, '', 'select', 'pl',
      [
        {value: 'eur', label: 'Europen Union (euro)'}, {value: 'pl', label: 'Polska (złotówki)'},
        {value: 'rus', label: 'Russia (rubel)'}, {value: 'us', label: 'USA (dolar)'}
      ]
    )
  };

  isSubmitingSub: Subscription;

  constructor(private store: Store<FeatureState>) { super(); }

  ngOnInit() {
    this.isSubmitingSub = this.store.select(getIsAddingSalarySchema)
      .subscribe((status: boolean) => {
        this.isSubmiting = status;
      });
  }
  ngOnDestroy() {
    this.isSubmitingSub.unsubscribe();
  }

  handleSubmit(formState: FormState) {
    this.store.dispatch(new TryAddSalarySchema(formState));
  }
}
