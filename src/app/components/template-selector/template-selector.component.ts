import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '../../models/template';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent implements OnInit {

  invoiceTemplate: Template;
  releaseOrderTemplate: Template;
  paymentReceiptTemplate: Template;

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
