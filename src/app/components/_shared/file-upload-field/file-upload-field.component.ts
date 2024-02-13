import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-file-upload-field',
  templateUrl: './file-upload-field.component.html',
  styleUrls: ['./file-upload-field.component.css']
})
export class FileUploadFieldComponent implements OnInit {

  htmlInput!: HTMLInputElement;
  fileContent?: string;
  fileName?: string;
  IsFileSizeExceeded: boolean = false;
  IsTooManyFiles: boolean = false;
  IsInvalidFileExtension: boolean = false;
  maxFileSizeBytes: number = Number(environment.maxFileSizeBytes);
  maxFileSizeMBytes: number = Number(environment.maxFileSizeBytes) / (1024*1024);
  allowedFileExtensions: string = environment.allowedFileExtensions;
  allowedFileExtensionsArray: string[] = environment.allowedFileExtensions.split(',');

  @Input() isMandatory!: boolean;
  @Input() fieldName?: string;
  @Input() valueFileName?: string;
  @Input() valueFileContent?: string;

  @Output() 
  answered = new EventEmitter<any>();
  
  constructor() {
  }

  ngOnInit(): void {
    if(this.valueFileName !== undefined && this.valueFileName !== null && this.valueFileName !== ""){
      this.fieldName = this.valueFileName;
      this.fileContent = this.valueFileContent
    }
  }

  handleFileInput(event: Event) {
    var fileList = (<HTMLInputElement>event.target).files!;
    if(this.isFileUploadValid(fileList)){
      for (let index = 0; index < fileList.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(fileList?.item(index)!);
        reader.onloadend = () => {
          this.fileName = fileList?.item(index)?.name!;
          let fileContent = reader.result!.toString();
          this.fileContent = fileContent;
            if(index === fileList.length-1)
              this.answerQuestion(this.fileName, this.fileContent);
        }
      }
    }
  }

  isFileUploadValid(fileList: FileList): boolean{
    return this.isFilesSizeValid(fileList) && this.isFileExtensionValid(fileList);
  }

  isFilesSizeValid(fileList: FileList): boolean{
    this.IsFileSizeExceeded = false;
    for (let index = 0; index < fileList.length; index++) {
      if(fileList[index].size > this.maxFileSizeBytes){
        this.IsFileSizeExceeded = true;
        return false;
      }
    }
    return true;
  }

  isFileExtensionValid(fileList: FileList): boolean{
    this.IsInvalidFileExtension = false;
    for (let index = 0; index < fileList.length; index++) {
      if(fileList[index].name === undefined || this.allowedFileExtensionsArray.some((e) => e === '.'+fileList[index].name.split('.')[fileList[index].name.split('.').length-1]) ){
        return true;
      }
    }
    if(fileList.length > 0){
      this.IsInvalidFileExtension=true;
      return false;
    }
    return true;
  }

  removeFile(fileUploadHtmlElement: HTMLInputElement){
    const dt = new DataTransfer();
    if (fileUploadHtmlElement.files && fileUploadHtmlElement.files.length) {
      const fileArray = Array.from(fileUploadHtmlElement.files);
      fileArray.splice(0, 1);
      for (const file of fileArray) {
        dt.items.add(file);
      }
      fileUploadHtmlElement.files = dt.files;
    }
    this.fileName = "";
    this.fileContent = "";
    this.answerQuestion(this.fileName, this.fileContent);
  }

  answerQuestion(imageName: string, imageContent: string){
    this.answered.emit({imageName, imageContent});
  }
}
