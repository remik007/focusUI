import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.css']
})
export class CheckboxSelectorComponent implements OnChanges {

  checkboxValue: boolean = false;

  @Input() isMandatory!: boolean;
  @Input() fieldName?: string;
  @Input() value?: boolean;
  @Output() answered = new EventEmitter<any>();

  constructor() {
    
   }

   ngOnChanges(): void {
    if(this.value !== undefined && this.value !== null){
      this.checkboxValue = this.value;
    }
  }

  answerQuestion(answer: boolean){
    this.answered.emit({answer: !answer});
  }
}
