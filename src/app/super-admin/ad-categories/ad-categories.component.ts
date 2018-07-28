import { Component, OnInit } from '@angular/core';
import { DialogService, NotificationService } from 'app/services';
import { SuperAdminApiService } from '../super-admin-api.service';
import { AdCategory } from '../../models/ad-category';

@Component({
  selector: 'app-ad-categories',
  templateUrl: './ad-categories.component.html',
  styleUrls: ['./ad-categories.component.css']
})
export class AdCategoriesComponent implements OnInit {

  constructor(private dialog: DialogService,
    private api: SuperAdminApiService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.api.getCategories(0, null).subscribe(data => {
      this.categories[0] = data;
    })
  }

  categories = [[], [], [], [], [], []];
  
  selectedCategories: AdCategory[] = [null, null, null, null, null, null];

  selectCategory(index: number, category: AdCategory) {
    this.selectedCategories[index] = category;

    let nextIndex = index + 1;

    for (let i = nextIndex; i < this.selectedCategories.length; ++i) {
      this.categories[i] = null;
    }

    if (nextIndex < this.selectedCategories.length) {
      this.selectCategory(nextIndex, null);

      if (category) {
        this.api.getCategories(nextIndex, category).subscribe(data => {
          this.categories[nextIndex] = data;
        });
      }
    }
  }

  inputText : string[] = [null, null, null, null, null, null];

  addCategory(index: number) {
    let item = {
      level: index,
      name: this.inputText[index],
      _id: "",
      parent: index == 0 ? null : this.selectedCategories[index - 1]._id
    };

    this.api.createCategory(item).subscribe(data => {
      if (data.success) {
        this.categories[index].push(item);

        this.inputText[index] = null;
      }
      else {
        console.log(data);

        this.notification.show(data.msg);
      }
    });    
  }

  deleteCategory(index: number, category: AdCategory) {
    this.dialog.confirmDeletion("Are you sure want to delete this category and all its subcategories?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }
      }
    );
  }

}
