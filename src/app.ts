

import * as AWS from 'aws-sdk';
import * as uuidv4 from 'uuid/v4';
import "reflect-metadata";

import { Types } from './iocConfig';
import { User } from './models/user';
import { DocumentServiceResult } from './models/documentServiceResult';
import { IDocumentService, DocumentService } from './services/documentService';
import { IUserService, UserService } from './services/userService';
import { IocContainer } from './IocContainer';
import { DocumentServiceError } from './models/documentServiceError';


// Set the region
AWS.config.update({ region: "us-west-2" });

export let handler = (event, context, callback) => {    
    const userService = IocContainer.get<IUserService>(Types.UserService);
    const user = new User(uuidv4(), "john.doe", "John", "Doe", new Date(), null);

    userService.add(user, (error: DocumentServiceError) => {
        let resultText;
        if (error) {
            console.log("Error", error);
            resultText = "Failed to save user";
        } else {
            console.log("Success");
            resultText = "Saved user";
        }

        callback(null, resultText);
    });

    // userService.get('e43bf1b9-d177-40d2-a639-b53c2aef0cff', (error: DocumentServiceError, user?: User) => {
    //     let result;
    //     if (error) {
    //         result = "failed to get user";
    //         console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    //     } else {
    //         result = "get successful";
    //         console.log("GetItem succeeded:", JSON.stringify(user, null, 2));
    //     }

    //     callback(null, result);
    // })

    // var docClient = new AWS.DynamoDB.DocumentClient()
    
    // var table = "user";
    
    // var id = 'e43bf1b9-d177-40d2-a639-b53c2aef0cff';
    
    // var params = {
    //     TableName: table,
    //     Key:{
    //         "id": id
    //     }
    // };
    
    // docClient.get(params, function(err, data) {
    //     if (err) {
    //         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    //     } else {
    //         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    //     }
    //     callback(null, JSON.stringify(data));
    // });
};

