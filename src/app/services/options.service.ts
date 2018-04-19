import { Injectable } from '@angular/core';
import { Category } from '../rate-card/rate-card';

@Injectable()
export class OptionsService {

  constructor() { }

  categories = [
    new Category('Property', [
      new Category('Sale')
    ]),
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

}
