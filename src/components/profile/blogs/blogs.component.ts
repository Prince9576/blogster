import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from 'src/providers/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogComponent } from '../blog/blog.component';
import { Blog } from 'src/models/blog.model';
import { BlogService } from 'src/providers/blog.service';
import { Subscription } from 'rxjs';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  ICON_BASE = Constants.ICON_BASE;
  blogs: Blog[];
  blogsFetched: boolean;
  fetchSub: Subscription;
  createSub: Subscription;
  showScrollLoader: boolean = false;
  alphabetCount: number = 100;
  pageSize: number = 10;
  currentPage: number = 1;
  showMyBlogs: boolean = false;
  userId: string;
  pageSizeOptions: number[] = [10, 15, 20];
  dataLength: number;
  constructor( public dialog: MatDialog,
               private blogService: BlogService,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.userId = this.authService.userId
    this.getBlogsHelper();
    this.createSub = this.blogService.blogCreated.subscribe((blog: any) => {
      console.log("Blog created", blog)
      this.currentPage = 0;
      this.getBlogsHelper();
    })
  }

  pageEvent(event) {
    console.log(event);
    this.currentPage = event.pageIndex + 1;
    this.getBlogsHelper();
  }

  getBlogsHelper() {
    this.blogService.getBlogs(this.pageSize, this.currentPage).subscribe((response) => {
      this.dataLength = response.length;
      this.blogsFetched = true;
      this.showScrollLoader = false;
      this.blogs = response.blogs;
    })
  }

  ngOnDestroy() {
    this.fetchSub.unsubscribe();
    this.createSub.unsubscribe();
  }

  viewMore(blog) {
    console.log("Hello")
    const dialogRef = this.dialog.open(BlogComponent, {
      width: '60%',
      data: blog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goToUsersProfile(blog) {
    this.router.navigate(["profile", blog.authorRef], { state: { mode: 'Guest'}} );
  }

  toggleLike(blog: Blog) {
    this.blogService.likeBlog(this.userId, blog.id, blog).subscribe((response) => {
      if ( blog.liked ) {
        blog.like--;
      } else {
        blog.like++;
      }
      blog.liked = !blog.liked;
    })
  }

}
