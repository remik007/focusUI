import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.css']
})
export class EmailFieldComponent implements OnInit {

  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;
  
  answer: string = "";
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
    this.answered.emit({answer});
  }

}
