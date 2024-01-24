import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-number-text-field',
  templateUrl: './number-text-field.component.html',
  styleUrls: ['./number-text-field.component.css']
})
export class NumberTextFieldComponent implements OnInit {

  answer: string = "";

  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;

  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;

  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
   }

  ngOnInit(): void {
  }

  answerQuestion(answer: string){
    this.answer = answer;
    this.currentChars = answer.length;
    this.answered.emit({answer});
  }

}
