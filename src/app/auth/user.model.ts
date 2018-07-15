export class User {
    public nombre: string;
    public email: string;
    public uid: string;
    constructor(data) {
        this.nombre = data && data.nombre || null;
        this.email = data && data.email || null;
        this.uid = data && data.uid || null ;
    }
}
