import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { GenericMessageComponent } from '../generic-message/generic-message.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  ICON_BASE = Constants.ICON_BASE;
  profilePicturePath: any = "https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg";
  uploadErrorTitle: "File Upload Error";
  uploadErrorMessage: string;
  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    
  }

  showFullView(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    // Validate file
    if ( Math.round( file.size/(1024*1024) ) >= 5 ) {
      this.uploadErrorMessage = "Maximum file size limit exceeded. Please select a file upto 5 MB."
      const dialogRef = this.dialog.open(GenericMessageComponent, {
        width: window.innerWidth > 500 ? '20%' : '80%',
        height: window.innerWidth > 500 ? '40%' : '35%',
        data: {
          type: "Error",
          body: this.uploadErrorMessage,
        }
      });
      return;
    }
    if ( event && event.target.files && event.target.files.length === 1 ) {
      const dialogRef = this.dialog.open(ImageCropComponent, {
        width: window.innerWidth > 500 ? '60%' : '90%',
        data: event
      });
      dialogRef.afterClosed().subscribe((data) => {
        if ( data ) {
          this.profilePicturePath = data;
        }
      })
    }
  }
  

}
