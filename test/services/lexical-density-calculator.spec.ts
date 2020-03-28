import {expect} from 'chai';
import {instance, mock, when} from 'ts-mockito';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {LexicalDensityCalculator} from '../../src/services/lexical-density-calculator';

describe('should calculate lexical density', function () {
    const nonLexicalWordsService = mock(NonLexicalWordsService);
    const lexicalDensityCalculator = new LexicalDensityCalculator(instance(nonLexicalWordsService));

    it('should calculate lexical density for a single sentence', async function () {
        when(nonLexicalWordsService.findAllNonLexicalWords()).thenResolve(['a', 'to', 'the', 'have']);

        const lexicalDensity = await lexicalDensityCalculator.calculate('Kim loves going to the cinema');

        expect(lexicalDensity.overallLexicalDensity).to.equal(0.67);
        expect(lexicalDensity.sentenceLexicalDensities).to.deep.equal([0.67]);
    });

    it('should calculate lexical density for multiple sentences', async function () {
        when(nonLexicalWordsService.findAllNonLexicalWords()).thenResolve(['a', 'to', 'the', 'have']);

        const sentences = `Kim loves going to the cinema. John also likes to visit the cinema.`;
        const result = await lexicalDensityCalculator.calculate(sentences);

        expect(result.overallLexicalDensity).to.equal(0.69);
        expect(result.sentenceLexicalDensities).to.deep.equal([0.67, 0.71]);
    });
});