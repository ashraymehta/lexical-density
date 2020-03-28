import {expect} from 'chai';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';

describe('Non-Lexical Words Service', function () {
    const expectedListOfNonLexicalWords = ["to", "got", "is", "have", "and", "although", "or", "that", "when", "while", "a", "either",
        "more", "much", "neither", "my", "that", "the", "as", "no", "nor", "not", "at", "between", "in", "of", "without", "I", "you",
        "he", "she", "it", "we", "they", "anybody", "one"];
    it('should return a pre-defined list of non-lexical words', async function () {
        const allNonLexicalWords = await new NonLexicalWordsService().findAllNonLexicalWords();

        expect(allNonLexicalWords).to.deep.equal(expectedListOfNonLexicalWords);
    });
});
