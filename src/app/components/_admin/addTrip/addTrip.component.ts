import { Component } from '@angular/core';
import { environment } from "src/environment/environment";

declare let tinymce: any;

@Component({
  selector: 'app-addtrip',
  templateUrl: './addtrip.component.html',
  styleUrls: ['./addtrip.component.css']
})
export class AddTripComponent {
  source!: string;
  tinymceInit!: any;
  tinymceKey: string = environment.tinymceKey;
  tinymceContent: any;
  fieldname: string = "Mój nowy text field";
  false: boolean = false;
  true: boolean = true;
  dropdownData: Array<{id: number, name: string}> = [{id: 1, name: "test1"}, {id: 2, name: "test2"}];

  constructor(){
    this.source = "";
    this.tinymceInit = {
      plugins: 'image',
      toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
      image_advtab: true,
      file_picker_callback: function(cb: any, value: any, meta: any) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
          let file: any;
          if(input.files)
            file = input.files[0];
          var reader = new FileReader();
          reader.onload = function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = (reader.result as string).split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }
    }
  }

  saveAnswer(fieldname: string, answer: string){
    console.log("tinymce: "+ this.tinymceContent);
    console.log(fieldname + " answer: " + answer);
  }
  
}
