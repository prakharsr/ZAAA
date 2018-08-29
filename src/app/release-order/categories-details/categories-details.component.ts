import { Component, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { map, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AdCategory } from 'app/models/ad-category';
import { ApiService } from '../../services/api.service';

export class CategoriesDetails {
  selectedCategories: AdCategory[] = [null, null, null, null, null, null];
}

export class CategoriesInjection {
  categories: string[] = [];
  fixedLevel = -1;
}

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {

  categories = [[], [], [], [], [], []];

  query;
  details = new CategoriesDetails();
  fixedCategoriesLevel = -1;
  
  constructor(@Inject(MAT_DIALOG_DATA) private injected: CategoriesInjection,
    private api: ApiService) { }

  ngOnInit() {
    //this.fixedCategoriesLevel = this.injected.fixedLevel;

    this.initLists();
  }

  initLists(index = 0, parent = null) {
    this.api.getCategories(index, parent).subscribe(data => {
      this.categories[index] = data;

      if (this.injected.categories[index]) {
        let found = this.categories[index].find((M: AdCategory) => M.name == this.injected.categories[index]);

        if (found) {
          this.details.selectedCategories[index] = found;

          if (index < this.categories.length) {
            this.initLists(index + 1, found);
          }
        }
      }
    })
  }

  searchCategories = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .pipe(
        switchMap(term => this.api.searchCategories(term))
      )
      .catch(() => of([]));
  }

  categoryInputFormatter = (result: AdCategory[] ) => {
    this.initFromArray(0, result);

    return result[result.length - 1].name;
  }

  initFromArray(index: number, arr: AdCategory[]) {
    if (index >= arr.length) {
      if (index < this.categories.length) {
        this.setCategory(index, null);
      }

      return
    }

    this.details.selectedCategories[index] = this.categories[index].find(M => M._id == arr[index]._id);

    let nextIndex = index + 1;

    if (nextIndex < this.categories.length) {
      this.api.getCategories(nextIndex, arr[index]).subscribe(data => {
        this.categories[nextIndex] = data;

        this.initFromArray(nextIndex, arr);
      })
    }
  }

  format(categories: AdCategory[]): string {
    let result = "";

    if (categories.length) {
      result = categories[0].name;
    }

    for (let i = 1; i < categories.length; ++i) {
      if (categories[i]) {
        result += ' > ' + categories[i].name;
      }
      else break;
    }

    return result;
  }

  categoryResultFormatter = (result: AdCategory[]) => this.format(result);

  setCategory(index: number, category: AdCategory) {
    this.details.selectedCategories[index] = category;

    let nextIndex = index + 1;

    for (let i = nextIndex; i < this.categories.length; ++i) {
      this.categories[i] = null;
    }
    
    if (nextIndex < this.categories.length) {
      this.setCategory(nextIndex, null);

      if (category) {
        this.api.getCategories(nextIndex, category).subscribe(data => {
          this.categories[nextIndex] = data;
        })
      }
    }
  }
}
