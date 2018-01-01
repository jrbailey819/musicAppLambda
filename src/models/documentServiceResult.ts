export class DocumentServiceResult {
    constructor(
        public isSuccessful: boolean,
        public errorCode?: string,
        public errorMessage?: string) {}
}