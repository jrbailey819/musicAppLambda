import { injectable, inject } from 'inversify';
import { Types } from '../iocConfig';
import { IDocumentService, DocumentService } from './documentService';
import { User } from '../models/user';
import { DocumentServiceResult } from '../models/documentServiceResult';
import { DocumentServiceError } from '../models/documentServiceError';

export interface IUserService {
    add(user: User, callback: (error?: DocumentServiceError) => void) : void;
    get(id: string, callback: (error?: DocumentServiceError, user?: User) => void) : void;
}

@injectable()
export class UserService implements IUserService {
    private documentService: IDocumentService;
    private tableName: string = "user";

    public constructor(@inject(Types.DocumentService) docService: IDocumentService) {
        this.documentService = docService;
    }
    add(user: User, callback: (error?: DocumentServiceError) => void): void {
        this.documentService.put(this.tableName, user.getData(), (result: DocumentServiceResult) => {
            if (result.error) {
                callback(result.error);
            }
            else {
                callback();
            }
        });
    }
    get(id: string, callback: (error?: DocumentServiceError, user?: User) => void): void {
        this.documentService.get(this.tableName, id, (result: DocumentServiceResult) => {
            if (result.error) {
                callback(result.error);
            }
            else {
                callback(undefined, User.createUser(result.data));
            }
        });
    }

}