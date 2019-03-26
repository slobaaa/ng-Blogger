export class PostModule {
    post: {id: number, title: string, category: string, datePosted: string};
    id: number;
    title: string;
    category: string;
    datePosted: string;
    constructor (id: number, title: string, category: string, datePosted: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.datePosted = datePosted;
    }
}
