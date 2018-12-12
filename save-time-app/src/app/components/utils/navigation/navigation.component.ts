import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationLinks: any[] = [
    {icon: "store", name: "Products", childs: [
      {label: "add new", func: () => this.startAddProduct()}, {label: "browse added"}, {label: "templates"}
      ]
    },
    {icon: "local_dining", name: "Meals", childs: [
      {label: "add new"}, {label: "browse added"}
     ]
    },
    {icon: "accessibility", name: "Diets", childs: [
      {label: "add new"}, {label: "browse added"}
      ]
    },
    {icon: "store", name: "Trainings"},
    {icon: "store", name: "Statistics"}
  ];
  currentOpenedNavigationBar = -1;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = this.currentOpenedNavigationBar === index ? -1 : index;
    this.router.navigate(['home', this.navigationLinks[index].name.toLowerCase()]);
  }

  startAddProduct() {
    this.router.navigate(['home', 'products', 'add']);
  }
}
