import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { GenericMessageComponent } from '../generic-message/generic-message.component';
import { ActivatedRoute, Params, Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ProfileInfoProvider } from 'src/providers/profile-info.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  ICON_BASE = Constants.ICON_BASE;
  profilePicturePath: string;
  coverPicturePath: string;
  uploadErrorTitle: "File Upload Error";
  uploadErrorMessage: string;
  loading: boolean = false;
  userId: string;
  userInfo: User;
  mode: string;
  constructor( private dialog: MatDialog,
               private route: ActivatedRoute, 
               private profileInfoProvider: ProfileInfoProvider,
               private router: Router ) { }

  ngOnInit(): void {
   this.loading = true;
   this.mode = history.state.mode;
   this.route.params.subscribe((param: Params) => {
     this.userId = param.id;
     console.log("Profile info pro", this.profileInfoProvider);
     this.profileInfoProvider.getProfileInfo(this.userId).subscribe((data: any) => {
       this.profileInfoProvider.profileInfo = data.response;
       this.userInfo = data.response;
       this.profilePicturePath = this.userInfo.profilePicture;
       this.coverPicturePath = `url(${this.userInfo.coverPicture})`;
       this.loading = false;
     })
   })
  }
  
  ngOnDestroy() {
    
  }

  showFullView(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  async fileUploaded(event: any, mode: string): Promise<any> {
    
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
      const isValid = await this.validateMimeType(file);
      console.log("FInal validity : ", isValid);
      if ( isValid ) {
        if ( mode === "dp" ) {
          const dialogRef = this.dialog.open(ImageCropComponent, {
            width: window.innerWidth > 500 ? '60%' : '90%',
            data: event
          });
          dialogRef.afterClosed().subscribe((data) => {
            if ( data ) {
              console.log("Upload pro pic func", this.userInfo);
              this.profileInfoProvider.uploadProfilePicture(file, this.userId, mode);
              this.profileInfoProvider.pictureUpdated.subscribe((user: User) => {
                console.log("Upload pro pic func 2", user);
                this.userInfo = user;
                this.profilePicturePath = data;
              })
            }
          })
        } else {
          console.log("Cover");
          this.profileInfoProvider.uploadProfilePicture(file, this.userId, mode);
              this.profileInfoProvider.pictureUpdated.subscribe((user: User) => {
                console.log("Upload pro pic func 2", user);
                this.userInfo = user;
                const fr = new FileReader();
                fr.onload = () => {
                  const result = fr.result as any;
                  this.coverPicturePath = `url(${result})`;
                }
                fr.readAsDataURL(file);
          })
        }
      } else {
        this.uploadErrorMessage = "Wrong file type, you can only select jpg or png."
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
      
    }
  }

  private validateMimeType(file: File) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.addEventListener("loadend", () => {
        const buffer = (fr.result) as ArrayBuffer;
        const arr = new Uint8Array(buffer).subarray(0,4);
        let header = "";
        for ( let i = 0; i < arr.length; i++ ) {
          header+= arr[i].toString(16);
        }
        console.log("Arr header", header);
        let isValid = false;
        switch(header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }
        resolve(isValid);
      });
      fr.readAsArrayBuffer(file);
    })
    }
    
}
