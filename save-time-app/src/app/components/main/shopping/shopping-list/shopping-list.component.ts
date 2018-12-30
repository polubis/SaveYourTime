import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromUserSettings from '../../../../containers/main/store/user-settings/reducers';
import { getIsLoadingSettings, getSalarySchema } from "src/app/containers/main/store";
import { Subscription } from "rxjs";
import { ChangeState } from "src/app/containers/main/store/user-settings/actions";
import { FeatureState, ISalarySchema } from "../../../../containers/main/store/user-settings/reducers";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  shopping: any[] = [];

  isLoadingSettings: boolean;
  salarySchema: ISalarySchema;

  settingsSub: Subscription;
  salarySchemaSub: Subscription;

  constructor(private store: Store<FeatureState>) { }
  ngOnInit() {
    this.settingsSub = this.store.select(getIsLoadingSettings)
      .subscribe((status: boolean) => {
        this.isLoadingSettings = status;
      });
    this.salarySchemaSub = this.store.select(getSalarySchema)
      .subscribe((schema: ISalarySchema) => {
        this.salarySchema = schema;
      });
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
    this.salarySchemaSub.unsubscribe();
  }

  openSalarySchema() {
    this.store.dispatch(new ChangeState(
      {key: 'salaryModal', value: true}
    ));
  }
}
