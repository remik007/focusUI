import { Injectable } from '@angular/core';
import { IAppState } from '../state/app.state';
import { Store } from '@ngrx/store';



@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  userValidated:boolean;
  constructor(private store: Store<IAppState>){ 
    this.userValidated = false;
  }

  regEmail = new RegExp("^^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+[.]+[a-zA-]{2,5}$");
  regNumber = new RegExp("[0-9]*");

  isEmailValid(email: string): boolean{
    return this.regEmail.test(email);
  }

  changeDateFormat(stringDate: string): string{
    try{
      var dateParts = stringDate.split('-');
      var day = dateParts[2];
      var month = dateParts[1];
      var year = dateParts[0];
      return day + '/' + month + '/' + year;
    }
    catch{
      return stringDate;
    }
  }

  formatDate(date: Date): string{
    
    let dateString = date.toString();
    let year = dateString.substring(0,4);
    let month = dateString.substring(5,7);
    let day = dateString.substring(8,10);
    return year+"-"+month+"-"+day;
  }

  isDateBiggerThanCurrent(stringDate: string): boolean{
    
    var isValid = false;
    try{
      var dateParts = stringDate.split('-');
      var day = parseInt(dateParts[2]);
      var month = parseInt(dateParts[1])-1;
      var year = parseInt(dateParts[0]);
      var date = new Date();
      date.setDate(day);
      date.setMonth(month);
      date.setFullYear(year);
      var currentTime = new Date();
      if(date <= currentTime){
        isValid = true;
      }
    }
    finally{
      return isValid;
    }
  }

  isNumberValid(numberAnswer: string): boolean{
    let regexResults = this.regNumber.exec(numberAnswer);
    if(regexResults == null)
      return false
    else
      if(regexResults[0] === numberAnswer)
        return true;
    return false;
  }

  isDropdownValid(question: Array<{id: number, name: string}>, answer: {id: number, name: string}): boolean{
    return question.map(x => x.name).includes(answer.name)!;
  }

}
