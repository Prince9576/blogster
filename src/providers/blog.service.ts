import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/models/blog.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { ProfileInfoProvider } from './profile-info.service';

@Injectable()
export class BlogService {
    private BASE_URL: string = environment.BASE_URL;
    public blogCreated: Subject<any> = new Subject();
    constructor( private http: HttpClient, 
                 private authService: AuthService, 
                 private profileInfoProvider: ProfileInfoProvider,
                 ) {}

    getBlogs( pageSize: number, currentPage: number ) {
        console.log("Pagesize:", pageSize, "Current page ", currentPage);
        const queries = `?pageSize=${pageSize}&currentPage=${currentPage}`;
        return this.http.get(this.BASE_URL + "blogs" + queries)
        .pipe(
            map((data: { status: string, response: any[], length: number }) => {
                const blogs = data.response.map((d: any) => {
                    return {
                        id: d._id,
                        title: d.title,
                        content: d.content,
                        like: d.like,
                        timestamp: d.timestamp,
                        author: d.author,
                        authorRef: d.authorRef
                    }
                })
                return {
                    blogs,
                    length: data.length
                }
            })
        )
    }

    postBlog(title: string, content: string) {
        const reqBody = {
            title,
            content,
            authorRef: this.authService.userId,
            author: this.profileInfoProvider.profileInfo.name,
        }
        this.http.post(this.BASE_URL + "blogs", reqBody).subscribe((data: any) => {
            this.blogCreated.next(data.response);
            console.log("Blog created", data)
        })
    }

    likeBlog(userId: string, blogId: string, blog: Blog) {
        let step: string;
        console.log(blog);
        // if ( liked ) {
        //     step = "dislike";
        // } else {
        //     step = "like";
        // }
        // console.log("liked", liked);
        const reqBody = {
            userId,
            blogId,
            step,
        }
        return this.http.put(this.BASE_URL + "blogs/" + "like", reqBody);
    }
}