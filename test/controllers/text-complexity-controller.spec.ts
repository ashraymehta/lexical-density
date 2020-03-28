import {expect} from 'chai';
import {TextComplexityController} from '../../src/controllers/text-complexity-controller';
import {LexicalDensityCalculator} from '../../src/services/lexical-density-calculator';
import {instance, mock, when} from 'ts-mockito';
import httpMocks = require('node-mocks-http');

describe('Text Complexity Controller', function () {
    const lexicalDensityCalculator = mock(LexicalDensityCalculator);
    const textComplexityController = new TextComplexityController(instance(lexicalDensityCalculator));

    it('should return the text complexity', async function () {
        const text = 'Kim loves going to the cinema';
        const response = httpMocks.createResponse();
        when(lexicalDensityCalculator.calculate(text)).thenResolve({sentenceLexicalDensities: [], overallLexicalDensity: 0.42});

        await textComplexityController.calculateComplexity(text, response);

        expect(response._isJSON()).to.be.true;
        expect(response._isEndCalled()).to.be.true;
        expect(response._getJSONData()).to.deep.equal({
            data: {
                overall_ld: 0.42
            }
        });
    });
});