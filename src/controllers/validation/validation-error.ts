import {ValidationError as VError} from 'express-validator';

export class ValidationError extends Error {
    public readonly nestedErrors: VError[];

    constructor(nestedErrors: VError[]) {
        super();
        this.nestedErrors = nestedErrors;
    }
}