import { Component, OnInit } from '@angular/core';
import { Category } from '../../rate-card/rateCard';

@Component({
  selector: 'app-ad-categories',
  templateUrl: './ad-categories.component.html',
  styleUrls: ['./ad-categories.component.css']
})
export class AdCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  categories: Category[]  = [
    new Category('Property'),
    new Category('Education'),
    new Category('Medical', [
      new Category('Surgery', [
        new Category('C', [
          new Category('Heart Surgery', [
            new Category('Transplant', [
              new Category('Deepest')
            ])
          ])
        ]),
        new Category('R', [
          new Category('S', [
            new Category('Deepest')
          ])
        ])
      ])
    ]),
    new Category('Women'),
    new Category('Real Estate')
  ];
  
  selectedCategories: Category[] = [null, null, null, null, null, null];

}
