import { Container } from "inversify";
import { IDocumentService, DocumentService } from './services/documentService';
import { IUserService, UserService } from './services/userService';
import { Types } from './iocConfig';

export let IocContainer = new Container();
IocContainer.bind<IDocumentService>(Types.DocumentService).to(DocumentService);
IocContainer.bind<IUserService>(Types.UserService).to(UserService);
