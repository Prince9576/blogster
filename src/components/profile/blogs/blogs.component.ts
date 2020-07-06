import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

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
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque placeat quam molestiae? Nam non est perspiciatis saepe necessitatibus veritatis delectus alias nostrum sit cumque dignissimos, et inventore quae corporis.",
      author: "Piyush Kumar",
      like: 125,
      love: 2
    },
  ]
  constructor() { }

  ngOnInit(): void {
    console.log(this.blogs);
  }

  sliderChanged() {
    console.log("Slider changed")
  }

}
