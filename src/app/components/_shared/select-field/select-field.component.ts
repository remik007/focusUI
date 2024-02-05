import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IDropdown } from 'src/app/models/dropdown.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnChanges {

  answer: number = -1;

  @Input() data!: Array<IDropdown>;
  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;
  @Input() value!: string;

  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
   }

   ngOnChanges(): void {
    if(this.value !== undefined && this.value !== null && this.value !== "-1"){
      this.answer = parseInt(this.value);
    }
  }

  answerQuestion(answer: number){
    this.answered.emit({answer});
  }

}
