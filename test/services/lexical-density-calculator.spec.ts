import {expect} from 'chai';
import {instance, mock, when} from 'ts-mockito';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {LexicalDensityCalculator} from '../../src/services/lexical-density-calculator';

describe('should calculate lexical density', function () {
    const nonLexicalWordsService = mock(NonLexicalWordsService);
    const lexicalDensityCalculator = new LexicalDensityCalculator(instance(nonLexicalWordsService));

    it('should calculate lexical density for a single sentence', async function () {
        when(nonLexicalWordsService.findAllNonLexicalWords()).thenResolve(['a', 'to', 'the', 'have']);

        const lexicalDensity = await lexicalDensityCalculator.calculateForSentence('Kim loves going to the cinema');

        expect(lexicalDensity).to.equal(0.67);
    });
});