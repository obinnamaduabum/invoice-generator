import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload-gallery',
  templateUrl: './file-upload-gallery.component.html',
  styleUrls: ['../../../../../assets/css/shimmer.css', './file-upload-gallery.component.css']
})
export class FileUploadGalleryComponent implements OnInit {

  listOfUploadedLogos: any[] = ["2", "3", "4", "6", "7", "8", "8", "4", "3", "d", "33", "45", "56", "34", "4343", "56", "34", "4343"];
  constructor() { }

  ngOnInit(): void {
  }

}
