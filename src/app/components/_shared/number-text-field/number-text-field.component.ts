import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-number-text-field',
  templateUrl: './number-text-field.component.html',
  styleUrls: ['./number-text-field.component.css']
})
export class NumberTextFieldComponent implements OnChanges {

  answer: string = "";

  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;

  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName?: string;
  @Input() value?: string;

  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
   }

   ngOnChanges(): void {
    if(this.value !== undefined && this.value !== null && this.value !== "-1"){
      this.answer = this.value.toString();
    }
  }

  answerQuestion(answer: string){
    this.answer = answer;
    this.currentChars = answer.length;
    this.answered.emit({answer});
  }

}
