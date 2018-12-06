import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationLinks: any[] = [
    {icon: "store", name: "Products", childs: ["add new", "browse added", "templates"]},
    {icon: "local_dining", name: "Meals", childs: ["add new", "browse added"]},
    {icon: "accessibility", name: "Diets", childs: ["add new", "browse added"]},
    {icon: "store", name: "Trainings"},
    {icon: "store", name: "Statistics"}
  ];
  currentOpenedNavigationBar = -1;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  changeOpenedNavigationBar(index: number) {
    this.currentOpenedNavigationBar = this.currentOpenedNavigationBar === index ? -1 : index;
    this.router.navigate([this.navigationLinks[index].name.toLowerCase()]);
    console.log(this.currentOpenedNavigationBar)
  }
}
