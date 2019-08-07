import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleUploadComponent } from './single-upload/single-upload.component';
import { MultipleUploadComponent } from './multiple-upload/multiple-upload.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {path: "", component: SingleUploadComponent },
  {path: "multi", component: MultipleUploadComponent },
  {path: "images", component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
