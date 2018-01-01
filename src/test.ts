import * as AWS from 'aws-sdk';
import * as uuidv4 from 'uuid/v4';
import "reflect-metadata";

import { IDocumentService, DocumentService } from './services/documentService';
import { IUserService, UserService } from './services/userService';
import { User } from './models/user';
import { DocumentServiceResult } from './models/documentServiceResult';
import { IocContainer, Types } from './iocConfig';

const documentService2 = IocContainer.get<IDocumentService>(Types.DocumentService);
const userService2 = IocContainer.get<IUserService>(Types.UserService);