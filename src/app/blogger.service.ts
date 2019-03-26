import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class BloggerService {
    constructor (private http: HttpClient, private authService: AuthService) { }
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    getAllBloggers() {
        const token = this.authService.getToken();
            return this.http.get<any[]>('https://bloggersloba.firebaseio.com//bloggers.json?auth=' + token , {
            headers: this.headers
        });
    }
    saveBloggers(posts) {
        const token = this.authService.getToken();
         return this.http.put('https://bloggersloba.firebaseio.com//bloggers.json?auth=' + token, posts, {
            headers: this.headers
        });
    }
    addBloggers(posts) {
        const token = this.authService.getToken();
         return this.http.post('https://bloggersloba.firebaseio.com//bloggers.json?auth=' + token, posts, {
            headers: this.headers
        });
    }
}
