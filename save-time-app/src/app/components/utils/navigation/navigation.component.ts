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
    {path: '/main/products', icon: "store", name: "Products", childs: [
        {label: "add new", func: () => this.onClickLink.emit('openAddProduct')}, {label: "browse shared"}, {label: "templates"}
      ]
    },
    {icon: "local_dining", name: "Shopping", childs: [
      {label: "add new"}
     ]
    },
    {icon: "accessibility", name: "Diets", childs: [
      {label: "add new"}, {label: "browse added"}
      ]
    },
    {icon: "store", name: "Trainings"},
    {icon: "store", name: "Statistics"}
  ];
  currentOpenedNavigationBar: number;

  navOpen = true;

  togle(key: string) {
    this[key] = !this[key];
  }

  constructor(private router: Router, private store: Store<AppState>) {
    this.currentOpenedNavigationBar = this.findStartNavigationBarIndex();
  }

  findStartNavigationBarIndex() {
    const path = document.location.pathname;
    const length = this.navigationLinks.length;
    for(let i = 0; i < length; i++) {
      if(this.navigationLinks[i].path === path) {
        return i;
      }
    }
    return -1;
  }

  ngOnInit() {

  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = index;
    this.router.navigate(['main', this.navigationLinks[index].name.toLowerCase()]);
  }
}
