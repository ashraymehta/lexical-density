import {Response} from 'express';
import {LexicalDensityCalculator} from '../services/lexical-density-calculator';

export class TextComplexityController {
    private readonly lexicalDensityCalculator: LexicalDensityCalculator;

    constructor(lexicalDensityCalculator: LexicalDensityCalculator) {
        this.lexicalDensityCalculator = lexicalDensityCalculator;
    }

    public async calculateComplexity(text: string, res: Response) {
        const lexicalDensity = await this.lexicalDensityCalculator.calculate(text);
        res.json({
            data: {
                overall_ld: lexicalDensity.overallLexicalDensity
            }
        });
    }
}