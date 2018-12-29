import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { ChangeState } from "src/app/store/products/actions";
import { getCategories, getLogoutStatus, getLoggedUserState, getLogInData } from "src/app/store";
import { IProductCategory } from "src/app/models/product";
import { TryLogOut, TryGetLoggedUserData, TryUploadUserAvatar } from "src/app/store/users/actions";
import { Subscription } from "rxjs";
import { ILoggedUser } from "src/app/store/users/reducers";
import { InputBase } from "src/app/services/input-base";
import { ValidationService } from "src/app/components/utils/form/validation.service";
import { Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../shared.scss', './navigation.component.scss']
})
export class NavigationComponent extends ValidationService implements OnInit {
  isLogingOut = false;
  isLoadingImage = false;
  isImageOnError = '';
  validationSetting = new Setting('user avatar', { isPicture: true, isFileWithCorrectSize: 300000 } );

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
    {icon: "store", name: "Trainings"}
  ];
  currentOpenedNavigationBar: number;

  navOpen = true;

  togle(key: string) {
    this[key] = !this[key];
  }

  categoriesSub: Subscription;
  logoutSub: Subscription;
  userDataSub: Subscription;
  userDataStateSub: Subscription;

  isGettingUserData: boolean;
  loggedUserData: ILoggedUser;

  constructor(private router: Router, private store: Store<AppState>) {
    super();
    this.currentOpenedNavigationBar = this.findStartNavigationBarIndex();
  }

  closeError() {
    this.isImageOnError = '';
  }

  reloadUserData() {
    this.store.dispatch(new TryGetLoggedUserData());
  }

  openAddProduct() {
    this.onClickLink.emit('openAddProduct');
  }

  openAddCategoryModal() {
    this.store.dispatch(new ChangeState( { key: 'categoryModal', value: true}));
  }

  handleFilePick(event) {
    event.preventDefault();
    this.isLoadingImage = true;
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    try {
      reader.onload = () => {
        this.isImageOnError  = super.runInputValidation(file, this.validationSetting);
        this.isLoadingImage = false;
        if (!this.isImageOnError) {
          this.store.dispatch(new TryUploadUserAvatar({file, userData: this.loggedUserData}));
        }
      };
      reader.readAsDataURL(file);
    }
    catch(err) {
      this.isLoadingImage = false;
    }
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
    this.categoriesSub = this.store.select(getCategories)
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

    this.logoutSub = this.store.select(getLogoutStatus).subscribe((status: boolean) => {
      this.isLogingOut = status;
    });

    this.userDataSub = this.store.select(getLoggedUserState).subscribe((state: boolean) => {
      this.isGettingUserData = state
    });

    this.userDataStateSub = this.store.select(getLogInData)
      .subscribe((data: ILoggedUser) => {
        this.loggedUserData = data;
      });
      this.store.dispatch(new TryGetLoggedUserData());
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = index;
    this.router.navigate(['main', this.navigationLinks[index].name.toLowerCase()]);
  }

  logout () {
    this.store.dispatch(new TryLogOut());
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
    this.logoutSub.unsubscribe();
    this.userDataSub.unsubscribe();
    this.userDataStateSub.unsubscribe();
  }
}
