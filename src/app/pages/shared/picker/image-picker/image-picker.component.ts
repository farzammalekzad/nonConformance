import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Platform} from '@ionic/angular';




@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  selectedImage: string;
  desktopPlat = false;
  @Output() pickedImage = new EventEmitter<string | File>();
  @ViewChild('filePicker', {}) filePicker: ElementRef<HTMLInputElement>;
  @Input() showPreview = false;

  constructor(private platform: Platform) { }

  ngOnInit() {
    if (this.platform.is('mobile') && !this.platform.is('hybrid') || this.platform.is('desktop')) {
      this.desktopPlat = true;
    }
  }

  imagePick() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Camera.getPhoto({
          quality: 60,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          saveToGallery: false,
          width: 320,
          height: 240,
          correctOrientation: true,
          source: CameraSource.Prompt,
        }).then((image) => {
          this.selectedImage = image.dataUrl;
          this.pickedImage.emit(this.selectedImage);
       }).catch((err) => {
         console.log(err);
         this.filePicker.nativeElement.click();
       });

  }

  filePick(event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.pickedImage.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
  deletePreviewPic() {
    this.showPreview = false;
    this.pickedImage.emit(null);
  }
}
