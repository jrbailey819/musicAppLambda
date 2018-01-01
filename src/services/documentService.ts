import { injectable } from 'inversify';
import { Request } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { DocumentServiceResult } from '../models/documentServiceResult';
import { DocumentServiceError } from '../models/documentServiceError';

export interface IDocumentService {
    put(tableName: string, 
        item: any, 
        callback?: (result: DocumentServiceResult) => void
    ): void;

    get(tableName: string,
        id: string,
        callback?: (result: DocumentServiceResult) => void
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
                    callback(new DocumentServiceResult(DocumentServiceError.createError(err)));
                }
                else {
                    callback(new DocumentServiceResult());
                }    
            }
        });
    }

    get(tableName: string,
        id: string,
        callback?: (result: DocumentServiceResult) => void
    ): Request<DocumentClient.GetItemOutput, AWSError> {
        return this.documentClient.get({
            TableName: tableName,
            Key: { id: id }
        }, (err: AWSError, data: DocumentClient.GetItemOutput) => {
            if (err) {
                callback(new DocumentServiceResult(DocumentServiceError.createError(err)));
            }
            else {
                let result = new DocumentServiceResult();
                result.data = data.Item;
                callback(result);
            }
        });
    }
}