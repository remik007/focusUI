import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

 // dateToday:string;
  charactersLimit = Number(environment.textBoxCharactersLimit);
  currentChars = 0;
  
  answer:string ="";
  @Input() question!: string;
  @Input() isMandatory!: boolean;
  @Input() fieldName!: string;
  @Output() answered = new EventEmitter<any>();
  constructor(private validationService: ValidationService) {
    
    /*let d = new Date();
    let dd = String(d.getDate()).padStart(2,'0');
    let mm = String(d.getMonth()+1).padStart(2,'0');
    let yyyy = d.getFullYear();
    this.dateToday = [yyyy,mm,dd].join('-');*/
   }

  ngOnInit(): void {
  }

  answerQuestion(answer: string){
    this.answer = answer;
    this.answered.emit({answer});
  }

  isValidAnswer(answer: string): boolean{
    return this.validationService.isDateBiggerThanCurrent(answer);
  }
}
