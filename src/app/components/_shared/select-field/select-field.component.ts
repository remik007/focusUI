import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {

  answer: number = -1;

  @Input() data!: Array<{id: number, name: string}>;
  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;

  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
   }

  ngOnInit(): void {
  }

  answerQuestion(answer: number){
    this.answered.emit({answer});
  }

}
