import { DocumentServiceError } from './documentServiceError';

export class DocumentServiceResult {
    constructor(
        public error?: DocumentServiceError,
        public data?: any) {}
}