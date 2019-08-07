import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ImageUploadService } from '../image-upload.service';
import { ReadVarExpr } from '@angular/compiler';
declare var UIkit;

@Component({
  selector: 'app-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  styleUrls: ['./multiple-upload.component.scss']
})
export class MultipleUploadComponent implements OnInit {
  multiForm: FormGroup;
  urls = new Array<String>();

  constructor(private fb: FormBuilder, private imageUpload: ImageUploadService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.multiForm = this.fb.group({
      albumName: ['', Validators.required],
      multiImages: this.fb.array([])
    })
  }
  createImage(img) {
    const newImage = new FormControl(img, Validators.required);
    (<FormArray>this.multiForm.get('multiImages')).push(newImage)
  }
 
  get multiImages() : FormArray {
    return this.multiForm.get('multiImages') as FormArray;
  }
  get albumName() {
    return this.multiForm.get('albumName')
  }

  onFileUpload(event:any) {
    this.urls = [];
    let selectedFiles =  event.target.files;
    console.log(selectedFiles);
    if(selectedFiles) {
      for(let file of selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e);
          this.urls.push(e.target.result);
          console.log('Url Array',this.urls);
          this.createImage(e.target.result);
          
        }
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    this.imageUpload.multiImageSubmit(this.multiForm.value).subscribe((res) => console.log(res))
    UIkit.notification({message: 'Image Uploaded Successfully', status: 'success'});
  }


}
