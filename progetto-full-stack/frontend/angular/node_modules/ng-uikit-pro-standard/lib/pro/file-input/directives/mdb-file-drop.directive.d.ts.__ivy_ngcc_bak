import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MDBUploaderService, UploaderOptions, UploadInput, UploadOutput } from '../classes/mdb-uploader.class';
export declare class MDBFileDropDirective implements OnInit, OnDestroy {
    private platform_id;
    private elementRef;
    uploadInput: EventEmitter<UploadInput>;
    options: UploaderOptions;
    uploadOutput: EventEmitter<UploadOutput>;
    private _destroy$;
    upload: MDBUploaderService;
    isServer: boolean;
    el: HTMLInputElement;
    constructor(platform_id: any, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    stopEvent: (e: Event) => void;
    onDrop(e: any): void;
    onDragOver(e: any): void;
    onDragLeave(e: any): void;
}
