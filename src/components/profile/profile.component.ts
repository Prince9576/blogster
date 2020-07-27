import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { GenericMessageComponent } from '../generic-message/generic-message.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileInfoProvider } from 'src/providers/profile-info.service';
import { User } from 'src/models/user.model';
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
  userId: string;
  userInfo: User;
  constructor( private dialog: MatDialog, private route: ActivatedRoute, private profileInfoProvider: ProfileInfoProvider ) { }

  ngOnInit(): void {
   this.route.data.subscribe((data: any) => {
     if ( data && data.profileData && data.profileData.status === "S" ) {
       this.userInfo = data.profileData.response;
     }
     console.log("User Info", this.userInfo);
   })
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
