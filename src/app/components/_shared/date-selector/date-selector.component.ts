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
      console.log(this.value);
      let dateString = this.value.toString();
      let year = dateString.substring(0,4);
      let month = dateString.substring(5,7);
      let day = dateString.substring(8,10);
      let dateStringFormatted = year+"-"+month+"-"+day;
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
