import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnChanges {
  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;

  answer: string = "";
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
    this.currentChars = answer.length;
    this.answered.emit({answer});
    
  }

}
