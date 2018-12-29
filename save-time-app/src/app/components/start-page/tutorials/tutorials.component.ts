import { Component } from '@angular/core';
import { Product } from "src/app/models/product";
@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent {
  blockNames: string[] = ['main', 'products', 'meals', 'recipes', 'trainings', 'statistics'];
  currentOpenedBlock = 'main';
  exampleProducts: Product[] = [
    new Product(0, 'marchewka', 'warzywa', '', 0, 200, 'kcal'),
    new Product(1, 'chipsy lays', 'łakocie', '', 1, 150, 'kcal'),
    new Product(2, 'buraki', 'warzywa', '', 2, 80, 'kcal'),
    new Product(3, 'cukinia', 'warzywa', '', 2, 200, 'kcal'),
    new Product(4, 'ziemniaki', 'warzywa', '', 2, 300, 'kcal'),
    new Product(5, 'pomrańcze', 'owoce', '', 1, 200, 'kcal'),
    new Product(6, 'jogurt naturalny', 'nabiał', '', 2, 100, 'kcal'),
    new Product(7, 'mleko 2% tłuszczu', 'nabiał', '', 2, 50, 'kcal'),
    new Product(8, 'jogurt pitny', 'nabiał', '', 2, 120, 'cal'),
    new Product(9, 'smalec', 'dodatki', '', 1, 120, 'cal'),
  ];

  changeTutorialBlock(block: string) {
    this.currentOpenedBlock = block;
    window.scroll(0,0);
  }
}
