import 'reflect-metadata';
import {expect} from 'chai';
import {TextComplexityController} from '../../src/controllers/text-complexity-controller';
import {LexicalDensityCalculator} from '../../src/services/lexical-density-calculator';
import {instance, mock, when} from 'ts-mockito';
import httpMocks = require('node-mocks-http');

describe('Text Complexity Controller', function () {
    const lexicalDensityCalculator = mock(LexicalDensityCalculator);
    const textComplexityController = new TextComplexityController(instance(lexicalDensityCalculator));

    it('should return the overall lexical density', async function () {
        const text = 'Kim loves going to the cinema';
        const response = httpMocks.createResponse();
        when(lexicalDensityCalculator.calculate(text)).thenResolve({sentenceLexicalDensities: [], overallLexicalDensity: 0.42});

        await textComplexityController.calculateComplexity(text, undefined, response);

        expect(response._isJSON()).to.be.true;
        expect(response._isEndCalled()).to.be.true;
        expect(response._getJSONData()).to.deep.equal({
            data: {
                overall_ld: 0.42
            }
        });
    });

    it('should return the overall lexical density and sentence lexical density', async function () {
        const mode = 'verbose';
        const text = 'Kim loves going to the cinema. Another sentence here.';
        const response = httpMocks.createResponse();
        when(lexicalDensityCalculator.calculate(text))
            .thenResolve({sentenceLexicalDensities: [0.36, 0.56], overallLexicalDensity: 0.42});

        await textComplexityController.calculateComplexity(text, mode, response);

        expect(response._isJSON()).to.be.true;
        expect(response._isEndCalled()).to.be.true;
        expect(response._getJSONData()).to.deep.equal({
            data: {
                overall_ld: 0.42,
                sentence_ld: [0.36, 0.56]
            }
        });
    });
});