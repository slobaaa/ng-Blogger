export class Blogger {
    id: number;
    name: string;
    about: string;
    email: string;
    constructor (id: number, name: string, about: string, email: string) {
        this.id = id;
        this.name = name;
        this.about = about;
        this.email = email;
    }
}
