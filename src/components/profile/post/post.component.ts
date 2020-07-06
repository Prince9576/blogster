import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/providers/constants.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public Editor = ClassicEditor;
  public postForm: any;
  ICON_BASE = Constants.ICON_BASE;
  constructor() { }

  ngOnInit(): void {
    this.createPostForm();
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl("", [ Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
      body: new FormControl("", [ Validators.required, Validators.minLength(20), Validators.maxLength(5000)])
    })
  }

  submit() {
    console.log(this.postForm);
  }

}
