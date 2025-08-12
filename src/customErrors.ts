export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class BadRequest extends Error {
    constructor(message: string) {
        super(message);
    }
}