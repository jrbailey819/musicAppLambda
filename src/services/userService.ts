import { injectable, inject } from 'inversify';
import { Types } from '../iocConfig';
import { IDocumentService, DocumentService } from './documentService';
import { User } from '../models/user';
import { DocumentServiceResult } from '../models/documentServiceResult';

export interface IUserService {
    add(user: User, callback: (result: DocumentServiceResult) => void) : void;
    get(id: string) : User;
}

@injectable()
export class UserService implements IUserService {
    private documentService: IDocumentService;
    private tableName: string = "user";

    public constructor(@inject(Types.DocumentService) docService: IDocumentService) {
    //constructor() {
        this.documentService = docService;
        //this.documentService = new DocumentService();
    }
    add(user: User, callback: (result: DocumentServiceResult) => void): void {
        this.documentService.put(this.tableName, user.getData(), callback);
    }
    get(id: string): User {
        throw new Error("Method not implemented.");
    }

}