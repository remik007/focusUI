import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id!: string;
    private element: any;
    @Input() url!: string;
    safeUrl!: SafeResourceUrl;
    videoWidth: string =  (window.innerWidth - 100).toString + "px";
    videoHeight: string = (window.innerWidth - 500).toString + "px";

    constructor(private modalService: ModalService, private el: ElementRef, private _sanitizer: DomSanitizer) {
        this.element = el.nativeElement;
        this.videoWidth = (window.innerWidth - 40).toString + "px";
        this.videoHeight = (window.innerWidth*0,7).toString + "px";
    }

    ngOnInit(): void {
        // ensure id attribute exists
        //this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);  
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        if (!this.url) {
            console.error('modal must have a url');
            return;
        }


        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        if(this.url != "text"){
            this.safeUrl = this.transform(this.url);
        }
        setTimeout(() => { this.element.style.display = 'block'; }, 500);
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');


        this.safeUrl = this.transform('');
    }

    transform(value: string):  SafeResourceUrl {   
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
