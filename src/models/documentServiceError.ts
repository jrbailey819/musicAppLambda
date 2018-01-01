import { AWSError } from 'aws-sdk/lib/error';

export class DocumentServiceError {
    constructor(
        public code: string,
        public message: string) {}

    static createError(error: AWSError) {
        return new DocumentServiceError(error.code, error.message);
    }
}