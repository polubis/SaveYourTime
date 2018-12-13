import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() onClickLink = new EventEmitter<string>();
  @Input() initial = 'full-nav';
  navigationLinks: any[] = [
    {icon: "store", name: "Products", childs: [
        {label: "add new", func: () => this.onClickLink.emit('openAddProduct')}, {label: "browse shared"}, {label: "templates"}
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

  navOpen = true;

  togle(key: string) {
    this[key] = !this[key];
  }

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = this.currentOpenedNavigationBar === index ? -1 : index;
    this.router.navigate(['main', this.navigationLinks[index].name.toLowerCase()]);
  }
}
