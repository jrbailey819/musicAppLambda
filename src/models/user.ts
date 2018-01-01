export class User {
    constructor(
        public id: string,
        public userName: string,
        public firstName: string,
        public lastName: string,
        public createdDate: Date,
        public modifiedDate: Date) {}

    getData() {
        var data : any = {
            id: this.id,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            createdDate: this.createdDate.toISOString()
        };
        if (this.modifiedDate) {
            data.modifiedDate = this.modifiedDate.toISOString();
        }

        return data;
    }
    static createUser(data: any): User {
        return new User(
            data.id, 
            data.userName, 
            data.firstName, 
            data.lastName, 
            data.createdDate, 
            data.modifiedDate);
    }
}

