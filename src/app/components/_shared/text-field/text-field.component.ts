import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;

  answer: string = "";
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
