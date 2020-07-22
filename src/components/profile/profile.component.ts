import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropComponent } from './image-crop/image-crop.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  ICON_BASE = Constants.ICON_BASE;
  profilePicturePath: any = "https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg";
  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    
  }

  showFullView(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  fileUploaded(event: any): void {
    console.log("Event::", event);
    if ( event ) {
      const dialogRef = this.dialog.open(ImageCropComponent, {
        width: window.innerWidth > 500 ? '60%' : '90%',
        data: event
      });
      dialogRef.afterClosed().subscribe((data) => {
        this.profilePicturePath = data;
      })
    }
  }

}
