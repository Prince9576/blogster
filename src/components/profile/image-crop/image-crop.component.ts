import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
  public canvasRotation = 0;
  public transform: ImageTransform = {};
  public rotation = 0;
  public scale = 1;
  private base64Data: any;
  constructor( 
    public dialogRef: MatDialogRef<ImageCropComponent>,
    @Inject(MAT_DIALOG_DATA) public imageChangedEvent: any ) { }

  ngOnInit(): void {
    console.log(this.imageChangedEvent);
  }

  imageCropped(event) {
    this.base64Data = event.base64;
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  } 

  flipHorizontal() {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  cropAndReturnImage() {
    this.dialogRef.close(this.base64Data);
  }
 
  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
    console.log(this.transform);
  }
}
