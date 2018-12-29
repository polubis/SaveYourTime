import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromUserSettings from '../../../../containers/main/store/user-settings/reducers';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shopping: any[] = [];
  constructor(private store: Store<fromUserSettings.FeatureState>) { }
  ngOnInit() {
  }

}
