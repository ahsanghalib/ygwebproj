interface HttpExceptionInterface {
    status: number;
    message: string[]
}

export class HttpException implements HttpExceptionInterface {
    public message: string[]
    public status: number

    constructor(status: number, message: string[]) {
        this.message = message;
        this.status = status
    }
}