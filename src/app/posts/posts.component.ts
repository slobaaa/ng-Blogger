import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { BloggerService } from '../blogger.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  model: any = {}; // zbog valdiacije
  posts: { id: number, title: string, category: string, datePosted: string, bloggerPosted: string }[] = [];
  post: {id: number, title: string, category: string, datePosted: string, bloggerPosted: string};
  addForm: FormGroup;
  zadnjiRekord = 0;
  getId: number;
  getTitle: string;
  getCategory: string;
  getDate: string;
  getBlogger: string;


  bloggers: { id: number, name: string, about: string, email: string }[] = [];
  blogger: {id: number, name: string, about: string, email: string};

  constructor(private postService: PostService, private bloggerService: BloggerService) { }

  ngOnInit() {
    this.postService.getAllPosts()
    .subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
    // da blogere stavi u niz
    this.bloggerService.getAllBloggers()
    .subscribe(
      (bloggers) => {
        this.bloggers = bloggers;
      }
    );
  }
deletePost(id: number) {
  this.posts = this.posts.filter(posts => posts.id !== id);
  this.postService.savePosts(this.posts)
  .subscribe();
}

changePost(title: string, category: string, date: string, blogger: string) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === this.getId) {
          // this.post.id = id;
          this.posts[i].title = title;
          this.posts[i].category = category;
          this.posts[i].datePosted = date;
          this.posts[i].bloggerPosted = blogger;
          this.postService.savePosts(this.posts)
            .subscribe();
          break;
      }
    }
}

submit(title: string, category: string, date: string, blogger: string) {
  for (let index = 0; index < this.posts.length; index++) {
    if (index === this.posts.length - 1 && this.posts.length !== 0) {
      this.zadnjiRekord = this.posts[index].id;
    }
  }
  const newPost = {
     id: this.zadnjiRekord + 1,
     title: title,
     category: category,
     datePosted: date,
     bloggerPosted: blogger
   };

  this.posts.push(newPost);
  this.postService.savePosts(this.posts)
  .subscribe();
}

getUpdateData(id: number, title: string, category: string, date: string, blogger: string) {
  this.getId = id;
  this.getTitle = title;
  this.getCategory = category;
  this.getDate = date;
  this.getBlogger = blogger;
}

}
