

import * as AWS from 'aws-sdk';
import * as uuidv4 from 'uuid/v4';
import "reflect-metadata";

import { IDocumentService, DocumentService } from './services/documentService';
import { IUserService, UserService } from './services/userService';
import { User } from './models/user';
import { DocumentServiceResult } from './models/documentServiceResult';
import { IocContainer, Types } from './iocConfig';


// Set the region
AWS.config.update({ region: "us-west-2" });

export let handler = (event, context, callback) => {    
    //const documentClient = new AWS.DynamoDB.DocumentClient();
    const documentService = new DocumentService();
    const userService = new UserService(documentService);
    //const userService = new UserService();
    const documentService2 = IocContainer.get<IDocumentService>(Types.DocumentService);
    if (documentService2) {
        console.log("loaded document service");
    }
    else {
        console.log("failed to load document service");
    }
    const userService2 = IocContainer.get<IUserService>(Types.UserService);
    if (userService2) {
        console.log("loaded user service");
    }
    else {
        console.log("failed to load user service");
    }
    const user = new User(uuidv4(), "john.doe", "John", "Doe", new Date(), null);

    userService.add(user, (result: DocumentServiceResult) => {
        let resultText;
        if (result.isSuccessful) {
            console.log("Success");
            resultText = "Saved user";
        } else {
            console.log("Error", result);
            resultText = "Failed to save user";
        }

        callback(null, resultText);
    });
};

