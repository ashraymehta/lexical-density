import {Response} from 'express';
import {query} from 'express-validator';
import {RequestValidation} from './validation/request-validation';
import {LexicalDensityCalculator} from '../services/lexical-density-calculator';
import {controller, httpGet, queryParam, response} from 'inversify-express-utils';

@controller('/complexity')
export class TextComplexityController {
    private static readonly VerboseMode = 'verbose';
    private readonly lexicalDensityCalculator: LexicalDensityCalculator;

    constructor(lexicalDensityCalculator: LexicalDensityCalculator) {
        this.lexicalDensityCalculator = lexicalDensityCalculator;
    }

    @httpGet('', query('text').isLength({max: 1000}), RequestValidation.middleware())
    public async calculateComplexity(@queryParam('text') text: string,
                                     @queryParam('mode') mode: string,
                                     @response() res: Response) {
        const lexicalDensity = await this.lexicalDensityCalculator.calculate(text);

        const responseData: { overall_ld: number, sentence_ld?: number[] } = {overall_ld: lexicalDensity.overallLexicalDensity};
        if (mode === TextComplexityController.VerboseMode) {
            responseData.sentence_ld = lexicalDensity.sentenceLexicalDensities;
        }
        res.json({data: responseData});
    }
}