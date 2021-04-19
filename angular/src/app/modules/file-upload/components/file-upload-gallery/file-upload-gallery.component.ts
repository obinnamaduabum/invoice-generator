import { Component, OnInit } from '@angular/core';
import {LogoService} from "../../../../services/logo.service";
import {ResponseModel} from "../../../../models/response-model";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-file-upload-gallery',
  templateUrl: './file-upload-gallery.component.html',
  styleUrls: ['../../../../../assets/css/shimmer.css', './file-upload-gallery.component.css']
})
export class FileUploadGalleryComponent implements OnInit {

  listOfUploadedLogos: any[] = [];


  constructor(private logoService: LogoService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.generateTemplate(24);
    this.fetchImages();
  }


  fetchImages() {
    this.logoService.index().subscribe((data: ResponseModel) => {

      if(data) {
        const imgArray = data.data['data'];
        this.listOfUploadedLogos = imgArray;
      }
    });
  }

  generateTemplate(value: number) {
    for(let i = 0; i < value; i++) {
      this.listOfUploadedLogos.push({
        url: '',
        loaded: false
      });
    }
  }

  nullCheck(data) {
    if(data){
      return true;
    }
    return false;
  }

  loadImage($event: any, index: number) {
    //console.log($event);
    this.listOfUploadedLogos[index].loaded = true;
    const img = new Image();
    const myThis = this;
    // img.onload = function () {
    //   console.log("index: ...." );
    //   console.log(myThis.listOfUploadedLogos[index]);

    // }
  }

  getImageUrlOnSelect(url: string) {
    const dialog = this.dialog.getDialogById('logo-upload-dialog');
    dialog.close(url);
  }
}
