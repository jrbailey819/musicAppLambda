import { Request } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';

interface IDocumentService {
    put(tableName: string, 
        item: any, 
        callback: (err: AWSError, data: DocumentClient.PutItemOutput) => void
    ): void;

    get(tableName: string,
        id: string,
        callback?: (err: AWSError, data: DocumentClient.GetItemOutput) => void
    ): Request<DocumentClient.GetItemOutput, AWSError>;
}


export class DocumentService implements IDocumentService {
    documentClient: DocumentClient;
    constructor() {
        this.documentClient = new DocumentClient();
    }

    put(tableName: string,
        item: any,
        callback?: (err: AWSError, data: DocumentClient.PutItemOutput) => void
    ): Request<DocumentClient.PutItemOutput, AWSError> {
        return this.documentClient.put({
            TableName: tableName,
            Item: item
        }, callback);
    }

    get(tableName: string,
        id: string,
        callback?: (err: AWSError, data: DocumentClient.GetItemOutput) => void
    ): Request<DocumentClient.GetItemOutput, AWSError> {
        return this.documentClient.get({
            TableName: tableName,
            Key: { id: id }
        }, callback);
    }
}