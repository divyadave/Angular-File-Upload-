import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPhotos } from './photos';



@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  singleImageSubmit(formData) {
    return this.http.post('https://angularimageupload-3f681.firebaseio.com/.json', formData)

  }
  multiImageSubmit(formData) {
    return this.http.post('https://angularimageupload-3f681.firebaseio.com/.json', formData)
  }
  getImages() {
    return this.http.get<{[key: string]: IPhotos}>('https://angularimageupload-3f681.firebaseio.com/.json').pipe( map (responseData => {
      const albumArray: IPhotos[] = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          albumArray.push({  id: key, ...responseData[key] })
        }
      }
      return albumArray;

    }))
  }
}
