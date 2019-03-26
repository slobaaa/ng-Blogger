import { Component, OnInit, ViewChild } from '@angular/core';
import { BloggerService } from '../blogger.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-bloggers',
  templateUrl: './bloggers.component.html',
  styleUrls: ['./bloggers.component.css']
})
export class BloggersComponent implements OnInit {
  model: any = {}; // zbog valdiacije
  bloggers: { id: number, name: string, about: string, email: string }[] = [];
  blogger: {id: number, name: string, about: string, email: string};
  zadnjiRekord = 0;
  getId: number;
  getName: string;
  getAbout: string;
  getEmail: string;
  nameModel: string;

  posts: { id: number, title: string, category: string, datePosted: string, bloggerPosted: string }[] = [];
  post: {id: number, title: string, category: string, datePosted: string, bloggerPosted: string};

  constructor(private bloggerService: BloggerService, private postService: PostService) { }

  ngOnInit() {
    this.bloggerService.getAllBloggers()
    .subscribe(
      (posts) => {
        this.bloggers = posts;
      }
    );

    this.postService.getAllPosts()
    .subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }
deleteBlogger(id: number) {
// da izbrise sve koji imaju tog bloggera

if (confirm('Da li ste sigurni da izbrisete blogera jer ce se izbrisati i si njegovi postovi?')) {
  for (let i = 0; i < this.bloggers.length; i++) {
    if (this.bloggers[i].id === id) {
      for (let j = 0; j < this.posts.length; j++) { // da prvo izmeni u postovima pa ce onda u blogerima
        const zadnjiBrojac = j + 1;
        const lengthPosts = this.posts.length;
        if (this.bloggers[i].name === this.posts[j].bloggerPosted) {
          this.posts = this.posts.filter(posts => posts.bloggerPosted !== this.bloggers[i].name);
          this.postService.savePosts(this.posts)
          .subscribe();
        }
        if (zadnjiBrojac === lengthPosts) {
          break;
        }
      }
    }
  }
    this.bloggers = this.bloggers.filter(bloggers => bloggers.id !== id);
    this.bloggerService.saveBloggers(this.bloggers)
    .subscribe();
  }
}

changeBlogger(name: string, about: string, email: string) {
  if (confirm('Da li ste sigurni da promenite blogera jer ce se promeniti i autori postova?')) {
      for (let i = 0; i < this.bloggers.length; i++) {
        if (this.bloggers[i].id === this.getId) {
          for (let j = 0; j < this.posts.length; j++) { // da prvo izmeni u postovima pa ce onda u blogerima
            const zadnjiBrojac = j + 1;
            const lengthPosts = this.posts.length;
            if (this.bloggers[i].name === this.posts[j].bloggerPosted) {
              this.posts[j].bloggerPosted = name;
              this.postService.savePosts(this.posts)
              .subscribe();
            }
            if (zadnjiBrojac === lengthPosts) {
              break;
            }
          }
            // sada menja u blogerima
            this.bloggers[i].name = name;
            this.bloggers[i].about = about;
            this.bloggers[i].email = email;
            this.bloggerService.saveBloggers(this.bloggers)
              .subscribe();
            break;
        }
      }
  }
}

submit(name: string, about: string, email: string) {
  for (let index = 0; index < this.bloggers.length; index++) {
    if (index === this.bloggers.length - 1 && this.bloggers.length !== 0) {
      this.zadnjiRekord = this.bloggers[index].id;
    }
  }
  const newBlogger = {
     id: this.zadnjiRekord + 1,
     name: name,
     about: about,
     email: email
   };

  this.bloggers.push(newBlogger);
  this.bloggerService.saveBloggers(this.bloggers)
  .subscribe();
}

getUpdateData(id: number, name: string, about: string, email: string) {
  this.getId = id;
  this.getName = name;
  this.getAbout = about;
  this.getEmail = email;
}

}
