import {NextFunction, Request, Response} from 'express';
import {ValidationError} from './validation/validation-error';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from 'http-status-codes';

export class ErrorHandlingMiddleware {

    public static handleError(error: any, req: Request, res: Response, next: NextFunction): void {
        switch (error.constructor) {
            case ValidationError: {
                const response = {errors: (error as ValidationError).nestedErrors};
                res.status(BAD_REQUEST).json(response);
                break;
            }
            default:
                res.status(INTERNAL_SERVER_ERROR).end();
        }
    }
}