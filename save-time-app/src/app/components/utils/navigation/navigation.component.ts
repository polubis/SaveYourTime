import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { ChangeState } from "src/app/store/products/actions";
import { getCategories } from "src/app/store";
import { IProductCategory } from "src/app/models/product";

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
        {label: "add product", func: () => this.openAddProduct(), disabled: true},
        {label: "add category", func: () => this.openAddCategoryModal()}, {label: "templates"}
      ]
    },
    {icon: "local_dining", name: "Shopping", childs: [
      {label: "add new", func: () =>  this.router.navigate(['main', 'shopping', 'add'])}
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

  openAddProduct() {
    this.onClickLink.emit('openAddProduct');
  }

  openAddCategoryModal() {
    this.store.dispatch(new ChangeState( { key: 'categoryModal', value: true}));
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
    this.store.select(getCategories)
    .subscribe((categories: IProductCategory[]) => {
      const navigationLinks = [...this.navigationLinks];
      const productsLinks = {...navigationLinks[0]};
      if (categories.length > 0) {
        productsLinks.childs[0].disabled = false;
        productsLinks.childs[0].func = () => this.openAddProduct();
        productsLinks.childs[1].label = 'add category (' + categories.length + ')';
      }
      else {
        productsLinks.childs[0].disabled = true;
        productsLinks.childs[0].func = null;
        productsLinks.childs[1].label = 'add category';

      }
      this.navigationLinks = navigationLinks;
    });
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = index;
    this.router.navigate(['main', this.navigationLinks[index].name.toLowerCase()]);
  }
}
