import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '../../models/template';

@Component({
  selector: 'app-template-selector-item',
  templateUrl: './template-selector-item.component.html',
  styleUrls: ['./template-selector-item.component.css']
})
export class TemplateSelectorItemComponent implements OnInit {

  ngOnInit() { }

  @Input() name: string;

  tnc: string;

  @Output() templateChanged = new EventEmitter<Template>();

  private _templates;

  @Input() set templates(templates: Template[]) {
    this._templates = templates;

    this.selectedTemplate = templates[this.selectedIndex];
  };

  get templates(): Template[] {
    return this._templates;
  }

  selectedIndex = 0;

  @Output() @Input() selectedTemplate: Template;

  constructor() { }

  private updateTemplate() {
    this.selectedTemplate = this.templates[this.selectedIndex];

    this.templateChanged.emit(this.selectedTemplate);
  }

  NextTemplate() {
    if (this.selectedIndex == this.templates.length - 1)
      return;

    ++this.selectedIndex;

    this.updateTemplate();
  }

  PrevTemplate() {
    if (this.selectedIndex == 0)
      return;

    --this.selectedIndex;
    
    this.updateTemplate();
  }
}
