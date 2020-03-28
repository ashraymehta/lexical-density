import {Logger} from '../utils/logger';
import {NextFunction, Request, Response} from 'express';
import {ValidationError} from './validation/validation-error';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from 'http-status-codes';

export class ErrorHandlingMiddleware {
    private static logger = Logger.getLogger(ErrorHandlingMiddleware.name);

    public static handleError(error: any, req: Request, res: Response, next: NextFunction): void {
        switch (error.constructor) {
            case ValidationError: {
                const response = {errors: (error as ValidationError).nestedErrors};
                res.status(BAD_REQUEST).json(response);
                break;
            }
            default:
                ErrorHandlingMiddleware.logger.error(`Encountered an error. Returning status code [${INTERNAL_SERVER_ERROR}]. ${error.stack}`);
                res.status(INTERNAL_SERVER_ERROR).end();
        }
    }
}