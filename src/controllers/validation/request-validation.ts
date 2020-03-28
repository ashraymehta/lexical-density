import {ValidationError} from './validation-error';
import {validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

export class RequestValidation {
    public static middleware() {
        return RequestValidation.validate;
    }

    private static validate(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            next(new ValidationError(result.array()));
        } else {
            next();
        }
    }
}