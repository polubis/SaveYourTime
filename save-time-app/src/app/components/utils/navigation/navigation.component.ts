import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationLinks: any[] = [
    {icon: "store", name: "Products", childs: ["add new", "browse added", "templates"]},
    {icon: "local_dining", name: "Meals", childs: ["add new", "browse added"]},
    {icon: "store", name: "Diets"},
    {icon: "store", name: "Trainings"},
    {icon: "store", name: "Statistics"}
  ];
  currentOpenedNavigationBar = -1;
  
  constructor() { }

  ngOnInit() {
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = this.currentOpenedNavigationBar === index ? -1 : index;
    console.log(this.currentOpenedNavigationBar)
  }
}
