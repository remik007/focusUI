import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.css']
})
export class EmailFieldComponent implements OnChanges {

  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;
  
  answer: string = "";
  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName?: string;
  @Input() value?: string;
  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
  }

  ngOnChanges(): void {
    if(this.value !== undefined && this.value !== null && this.value !== ""){
      this.answer = this.value;
    }
  }

  answerQuestion(answer: string){
    this.answer = answer;
    this.answered.emit({answer});
  }

}
