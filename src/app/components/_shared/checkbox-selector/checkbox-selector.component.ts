import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.css']
})
export class CheckboxSelectorComponent implements OnInit {

  checkboxValue: boolean = false;

  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;
  @Output() answered = new EventEmitter<any>();

  constructor() {
   }

  ngOnInit(): void {
  }

  answerQuestion(answer: boolean){
    this.answered.emit({answer: !answer});
  }
}
