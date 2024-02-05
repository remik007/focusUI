import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnChanges {

 // dateToday:string;
  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;
  
  answer!:string;
  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;
  @Input() value!: Date;

  @Output() answered = new EventEmitter<any>();
  constructor(private validationService: ValidationService) {
   }

   ngOnChanges(): void {
    if(this.value !== undefined && this.value !== null){
      let dateStringFormatted = this.validationService.formatDate(this.value);
      this.answer = dateStringFormatted;
    }
  }


  answerQuestion(answer: string){
    this.answer = answer;
    this.answered.emit({answer});
  }

  isValidAnswer(answer: string): boolean{
    return this.validationService.isDateBiggerThanCurrent(answer);
  }
}
