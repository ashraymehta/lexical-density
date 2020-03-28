import {Response} from 'express';
import {controller, httpGet, queryParam, response} from 'inversify-express-utils';
import {LexicalDensityCalculator} from '../services/lexical-density-calculator';

@controller('/complexity')
export class TextComplexityController {
    private readonly lexicalDensityCalculator: LexicalDensityCalculator;

    constructor(lexicalDensityCalculator: LexicalDensityCalculator) {
        this.lexicalDensityCalculator = lexicalDensityCalculator;
    }

    @httpGet('')
    public async calculateComplexity(@queryParam('text') text: string, @response() res: Response) {
        const lexicalDensity = await this.lexicalDensityCalculator.calculate(text);
        res.json({
            data: {
                overall_ld: lexicalDensity.overallLexicalDensity
            }
        });
    }
}