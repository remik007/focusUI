import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeImg'
})
export class SanitizeImgPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(base64String?:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustResourceUrl(base64String!);
  }
}