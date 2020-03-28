import {expect} from 'chai';
import {instance, mock, when} from 'ts-mockito';
import {SentenceParser} from '../../src/services/sentence-parser';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {LexicalDensityCalculator} from '../../src/services/lexical-density-calculator';
import {Sentence} from '../../src/models/sentence';

describe('Lexical Density Calculator', function () {
    const sentenceParser = mock(SentenceParser);
    const nonLexicalWordsService = mock(NonLexicalWordsService);
    const lexicalDensityCalculator = new LexicalDensityCalculator(instance(nonLexicalWordsService), instance(sentenceParser));

    it('should calculate lexical density for a single sentence', async function () {
        const text = 'Kim loves going to the cinema';
        when(nonLexicalWordsService.findAllNonLexicalWords()).thenResolve(['a', 'to', 'the', 'have']);
        when(sentenceParser.parse(text)).thenReturn([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']}]);

        const lexicalDensity = await lexicalDensityCalculator.calculate(text);

        expect(lexicalDensity.overallLexicalDensity).to.equal(0.67);
        expect(lexicalDensity.sentenceLexicalDensities).to.deep.equal([0.67]);
    });

    it('should calculate lexical density for multiple sentences', async function () {
        const text = `Kim loves going to the cinema. John also likes to visit the cinema.`;
        when(nonLexicalWordsService.findAllNonLexicalWords()).thenResolve(['a', 'to', 'the', 'have']);
        when(sentenceParser.parse(text)).thenReturn([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']},
            <Sentence>{words: ['John', 'also', 'likes', 'to', 'visit', 'the', 'cinema']}]);

        const result = await lexicalDensityCalculator.calculate(text);

        expect(result.overallLexicalDensity).to.equal(0.69);
        expect(result.sentenceLexicalDensities).to.deep.equal([0.67, 0.71]);
    });

//  TODO: Add tests for case-sensitivity
});