import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ImageUploadService } from '../image-upload.service';
import { ReadVarExpr } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
declare var UIkit;

@Component({
  selector: 'app-single-upload',
  templateUrl: './single-upload.component.html',
  styleUrls: ['./single-upload.component.scss']
})
export class SingleUploadComponent implements OnInit {
  singleImageForm: FormGroup;
  url = "";


  constructor(private fb: FormBuilder, private imageUpload: ImageUploadService, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.singleImageForm = this.fb.group({
      imageName : ['', Validators.required],
      uploadDate: [''],
      userImage: ['', Validators.required]
      
    });

  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  
  
  /* Preview Single Image Function */

  onFileUpload(event:any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.singleImageForm.patchValue({
          userImage: reader.result
        });
        this.url = event.target.files;

      };
  }
  else {
    UIkit.notification({message:'Only Single Image can be uploaded', status: 'danger'});
  }
}
  onSubmit() {
    this.imageUpload.singleImageSubmit(this.singleImageForm.value).subscribe((res) => console.log(res))
    UIkit.notification({message: 'Image Uploaded Successfully', status: 'success'});
  }

  get imageName() {
    return this.singleImageForm.get('imageName');
  }
  get uploadDate() {
    return this.singleImageForm.get('uploadDate')
  }
  get userImage() {
    return this.singleImageForm.get('userImage')
  }

}
