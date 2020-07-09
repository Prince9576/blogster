import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/providers/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  public alphabetCount: number = 100;
  blogs = [
    {
      title: "Heavy Rain",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque placeat quam molestiae? Nam non est perspiciatis saepe necessitatibus veritatis delectus alias nostrum sit cumque dignissimos, et inventore quae corporis.",
      author: "Prince Kumar",
      like: 25,
      love: 23
    },
    {
      title: "Good Summer",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque placeat quam molestiae? Nam non est perspiciatis saepe necessitatibus veritatis delectus alias nostrum sit cumque dignissimos, et inventore quae corporis.",
      author: "Piyush Kumar",
      like: 125,
      love: 2
    },
    {
      title: "Good Summer",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque placeat quam molestiae? Nam non est perspiciatis saepe necessitatibus veritatis delectus alias nostrum sit cumque dignissimos, et inventore quae corporis.",
      author: "Piyush Kumar",
      like: 125,
      love: 2
    },
    {
      title: "Good Summer",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque placeat quam molestiae? Nam non est perspiciatis saepe necessitatibus veritatis delectus alias nostrum sit cumque dignissimos, et inventore quae corporis.",
      author: "Piyush Kumar",
      like: 125,
      love: 2
    },
    {
      title: "Good Summer",
      body: "Lorem ipsum",
      author: "Piyush Kumar",
      like: 125,
      love: 2
    },
  ]

  constructor( private dataService: DataService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    console.log(this.blogs);
  }

  sliderChanged() {
    console.log("Slider changed")
  }

  // viewMore(blog) {
  //   this.dataService.popupActivity.next({ data: blog, state: "open"});
  // }

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

}
