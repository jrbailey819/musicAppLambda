import { User } from '../models/user';

interface IUserService {
    add(user: User) : void;
    get(id: string) : User;
}

class UserService implements IUserService {
    add(user: User): void {
        throw new Error("Method not implemented.");
    }
    get(id: string): User {
        throw new Error("Method not implemented.");
    }

}