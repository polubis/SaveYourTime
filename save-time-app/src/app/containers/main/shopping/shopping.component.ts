import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromUserSettings from '../store/user-settings/reducers';
import { TryGetUserSettings, ChangeState } from "src/app/containers/main/store/user-settings/actions";
import { getSalaryModal } from "src/app/containers/main/store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  salaryModal: boolean;
  salaryModalSubscription: Subscription;

  constructor(private store: Store<fromUserSettings.FeatureState>) { }

  ngOnInit() {
    this.salaryModalSubscription = this.store.select(getSalaryModal)
      .subscribe((salaryModal: boolean) => {
        this.salaryModal = salaryModal;
      });
    this.store.dispatch(new TryGetUserSettings());
  }
  ngOnDestroy() {
    this.salaryModalSubscription.unsubscribe();
  }

  closeSalaryModal() {
    this.store.dispatch(new ChangeState(
      {key: 'salaryModal', value: false}
    ));
  }

}
