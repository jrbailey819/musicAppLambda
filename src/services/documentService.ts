import { injectable } from 'inversify';
import { Request } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { DocumentServiceResult } from '../models/documentServiceResult';

export interface IDocumentService {
    put(tableName: string, 
        item: any, 
        callback?: (result: DocumentServiceResult) => void
    ): void;

    get(tableName: string,
        id: string,
        callback?: (err: AWSError, data: DocumentClient.GetItemOutput) => void
    ): Request<DocumentClient.GetItemOutput, AWSError>;
}

@injectable()
export class DocumentService implements IDocumentService {
    documentClient: DocumentClient;
    constructor() {
        this.documentClient = new DocumentClient();
    }

    put(tableName: string,
        item: any,
        callback?: (result: DocumentServiceResult) => void
    ): void {
        this.documentClient.put({
            TableName: tableName,
            Item: item
        }, (err: AWSError, data: DocumentClient.PutItemOutput) => {
            if (callback) {
                if (err) {
                    callback(new DocumentServiceResult(false, err.code, err.message));
                }
                else {
                    callback(new DocumentServiceResult(true));
                }    
            }
        });
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