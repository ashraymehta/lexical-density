import {ValidationError} from './validation-error';
import {validationResult} from 'express-validator';
import {WordParser} from '../../services/word-parser';
import {NextFunction, Request, Response} from 'express';

export class RequestValidation {
    public static middleware() {
        return RequestValidation.validate;
    }

    public static wordCountValidator(permittedCount: number) {
        return (text: string) => new WordParser().parse(text).length <= permittedCount;
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