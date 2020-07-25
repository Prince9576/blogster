import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './generic-message.component.html',
  styleUrls: ['./generic-message.component.scss']
})
export class GenericMessageComponent implements OnInit {
  type: string;
  header: string;
  body: string
  constructor(
    public dialogRef: MatDialogRef<GenericMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    if ( this.data.header ) {
      this.header = this.data.header;
    } else {
      if ( this.data.type === "Error" ) {
        this.header = "An Error Occured !";
      } else {
        this.header = "Submitted Successfully";
      }
    }
    this.type = this.data.type;
    this.body = this.data.body;
  }

}
