import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {
    constructor (private http: HttpClient, private authService: AuthService) { }
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    getAllPosts() {
        const token = this.authService.getToken();
            return this.http.get<any[]>('https://bloggersloba.firebaseio.com//posts.json?auth=' + token , {
            headers: this.headers
        });
    }
    savePosts(posts) {
        const token = this.authService.getToken();
         return this.http.put('https://bloggersloba.firebaseio.com//posts.json?auth=' + token, posts, {
            headers: this.headers
        });
    }
    addPosts(posts) {
        const token = this.authService.getToken();
         return this.http.post('https://bloggersloba.firebaseio.com//posts.json?auth=' + token, posts, {
            headers: this.headers
        });
    }
}
