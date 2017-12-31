

import * as AWS from 'aws-sdk';
import * as uuidv4 from 'uuid/v4';

import { User } from './models/user';

// Set the region
AWS.config.update({ region: "us-west-2" });

export let handler = (event, context, callback) => {    
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const user = new User(uuidv4(), "john.doe", "John", "Doe", new Date(), null);

    const params = {
        TableName: 'user',
        Item: user.getData()
    };

    documentClient.put(params, function (err, data) {
        var result;
        if (err) {
            console.log("Error", err);
            result = "Failed to save user";
        } else {
            console.log("Success", data);
            result = "Saved user";
        }
        
        callback(null, result);
        
    })
};

