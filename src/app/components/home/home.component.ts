import { Component } from '@angular/core';
import { environment } from "src/environment/environment";

declare let tinymce: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  source!: string;
  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;

  constructor(){
    this.source = "";
  }


  
  
}
