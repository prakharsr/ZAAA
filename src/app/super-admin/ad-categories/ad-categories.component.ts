import { Component, OnInit } from '@angular/core';
import { DialogService, OptionsService } from 'app/services';
import { Category } from '@aaman/ratecard/rate-card';

@Component({
  selector: 'app-ad-categories',
  templateUrl: './ad-categories.component.html',
  styleUrls: ['./ad-categories.component.css']
})
export class AdCategoriesComponent implements OnInit {

  constructor(private dialog: DialogService, private options: OptionsService) { }

  ngOnInit() {
    this.categories = this.options.categories;
  }

  categories: Category[];
  
  selectedCategories: Category[] = [null, null, null, null, null, null];

  setCategory(index: number, category: Category) {
    if (this.selectedCategories[index] == category) {
      return;
    }

    this.selectedCategories[index] = category;

    for (let i = index + 1; i < this.selectedCategories.length; ++i) {
      this.setCategory(i, null);
    }
  }

  inputText : string[] = [null, null, null, null, null, null];

  addCategory(index: number) {
    if (index == 0) {
      this.categories.push(new Category(this.inputText[index]));
    }
    else {
      this.selectedCategories[index - 1].subcategories.push(new Category(this.inputText[index]));
    }

    this.inputText[index] = null;
  }

  deleteCategory(index: number, category: Category) {
    this.dialog.confirmDeletion("Are you sure want to delete this category?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }

        if (index == 0) {
          this.categories.splice(this.categories.indexOf(category), 1);
        }
        else {
          let arr = this.selectedCategories[index - 1].subcategories;

          arr.splice(arr.indexOf(category, 1));          
        }

        this.setCategory(index, null);
      }
    );
  }

}
