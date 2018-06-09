import { Component, OnInit } from '@angular/core';
import { Address } from 'app/models';

// Prevent circular dependency
import { StateApiService } from 'app/services/state-api.service';
import { ReleaseOrder } from '../release-order';
import { Category, RateCard } from '../../rate-card';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { OptionsService } from '../../services/options.service';
import { ActivatedRoute } from '@angular/router';

export class CategoriesDetails {
  selectedCategories: Category[] = [null, null, null, null, null, null];
}

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {

  details = new CategoriesDetails();
  fixedCategoriesLevel = -1;
  releaseorder = new ReleaseOrder();
  edit = false;
  id: string;
  
  constructor(public options: OptionsService, public stateApi: StateApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.options.categories;

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.initFromReleaseOrder();
      }
      else if (params.has('copy')) {
        this.initFromReleaseOrder();
      }
      else if (params.has('rateCard')) {
        this.route.data.subscribe((data: { rateCard: RateCard }) => this.initFromRateCard(data.rateCard));
      }
    });
  }

  private initFromReleaseOrder() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseorder = data.releaseOrder;

      this.buildCategoryTree([
        this.releaseorder.adCategory1,
        this.releaseorder.adCategory2,
        this.releaseorder.adCategory3,
        this.releaseorder.adCategory4,
        this.releaseorder.adCategory5,
        this.releaseorder.adCategory6
      ]);
    });
  }

  private initFromRateCard(rateCard: RateCard) {
    if (rateCard) {
      this.buildCategoryTree(rateCard.categories);
      
      for (let i = 0; i < rateCard.categories.length; ++i) {
        if (rateCard.categories[i]) {
          ++this.fixedCategoriesLevel;
        }
        else break;
      }
    }
  }

  private buildCategoryTree(categories: string[]) {
    let c : Category = this.categories.find(p => p.name == categories[0]);

    if (c) {
      this.category1 = c;

      let i = 1;

      while (i < categories.length && c.subcategories.length > 0) {
        c = c.subcategories.find(p => p.name == categories[i]);

        if (c) {
          this.setCategory(i, c);

          ++i;
        }
        else break;
      }
    }
  }

  findSubCategories(category: Category, query: string): Category[] {
    let result : Category[] = [];

    if (category.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
      result.push(category);
    }

    if (category.subcategories) {
      category.subcategories.forEach(subCategory => {
        this.findSubCategories(subCategory, query).forEach(a => result.push(a));
      });
    }

    return result;
  }

  findCategories(query: string): Category[]  {
    let result : Category[] = [];

    if (query) {
      let base = this.categories;

      if (this.fixedCategoriesLevel > -1) {
        base = this.details.selectedCategories[this.fixedCategoriesLevel].subcategories;
      }

      base.forEach(element => {
        this.findSubCategories(element, query).forEach(a => result.push(a));
      });
    }

    return result;
  }

  searchCategories = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .pipe(
        map(term => this.findCategories(term))
      )
      .catch(() => of([]));
  }

  categoryInputFormatter = (result: Category) => {
    let stack : Category[] = [];

    while (result) {
      stack.push(result);
      result = result.parent;
    }

    let j = this.fixedCategoriesLevel + 1;

    while (j > 0) {
      stack.pop();

      --j;
    }

    let i = this.fixedCategoriesLevel + 1;

    while (stack.length) {
      this.setCategory(i, stack.pop());

      ++i;
    }
  }

  categoryResultFormatter = (result: Category) => {
    let stack : Category[] = [];

    while (result) {
      stack.push(result);
      result = result.parent;
    }

    let formatted = stack.pop().name;

    while (stack.length) {
      formatted += " > " + stack.pop().name;
    }

    return formatted;
  }

  categories: Category[];

  getCategory(index: number) {
    return this.details.selectedCategories[index];
  }

  setCategory(index: number, category: Category) {
    if (this.details.selectedCategories[index] == category) {
      return;
    }

    this.details.selectedCategories[index] = category;

    for (let i = index + 1; i < this.details.selectedCategories.length; ++i) {
      this.setCategory(i, null);
    }
  }

  get category1() { return this.getCategory(0); }
  get category2() { return this.getCategory(1); }
  get category3() { return this.getCategory(2); }
  get category4() { return this.getCategory(3); }
  get category5() { return this.getCategory(4); }
  get category6() { return this.getCategory(5); }

  set category1(category: Category) { this.setCategory(0, category); }
  set category2(category: Category) { this.setCategory(1, category); }
  set category3(category: Category) { this.setCategory(2, category); }
  set category4(category: Category) { this.setCategory(3, category); }
  set category5(category: Category) { this.setCategory(4, category); }
  set category6(category: Category) { this.setCategory(5, category); }
}
