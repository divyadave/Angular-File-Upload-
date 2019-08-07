import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../image-upload.service';
import { IPhotos } from '../photos';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
 albumImages: IPhotos[] = [];
 error = null;

  constructor(private imageUpload: ImageUploadService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imageUpload.getImages().subscribe((res)=> {
      this.albumImages = res;
      console.log(this.albumImages);
    },
    error => {
      this.error = error.message,
      console.log(error);

    } 
    );
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}



}
