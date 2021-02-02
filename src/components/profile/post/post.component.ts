import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Constants } from 'src/providers/constants.service';
import { BlogService } from 'src/providers/blog.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChild("createFormRef") createFormRef: NgForm;
  public Editor = ClassicEditor;
  public postForm: FormGroup;
  ICON_BASE = Constants.ICON_BASE;
  loading: boolean = false;
  showSuccessMessage: boolean = false;
  createPostSub: Subscription;
  constructor( private blogService: BlogService) { }

  ngOnInit(): void {
    this.createPostForm();
    this.createPostSub = this.blogService.blogCreated.subscribe((data: any) => {
      console.log("Blog created successfully");
      this.loading = false;
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 3000);
    })
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl("", [ Validators.required, Validators.minLength(3), Validators.maxLength(5000)]),
      content: new FormControl("", [ Validators.required, Validators.minLength(3), Validators.maxLength(50000)])
    })
  }

  submit() {
    this.loading = true;
    this.blogService.postBlog(this.postForm.value.title, this.postForm.value.content);
    this.postForm.reset();
    this.createFormRef.resetForm();
  }

}
