import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Template } from '../../models/template';
import { ApiService } from '../../services/api.service';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-template-selector',
  animations: [routerAnimation],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  invoiceTemplate: Template;
  releaseOrderTemplate: Template;
  paymentReceiptTemplate: Template;

  jurisdiction: string;

  templates: Template[];

  @Output() done = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.templates.subscribe(data => {
      this.templates = data;
      this.invoiceTemplate = this.releaseOrderTemplate = this.paymentReceiptTemplate = data[0];
    });
  }

  submit() {
    this.done.emit();
  }
}
