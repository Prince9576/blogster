import { Component, OnInit, HostListener, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  title: string;
  body: string;
  constructor( 
    public dialogRef: MatDialogRef<BlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.body = this.data.body;
  }

  close() {
    this.dialogRef.close();
  }

}
