import {expect} from 'chai';
import {WordParser} from '../../src/services/word-parser';

describe('Word Parser', function () {
    const wordParser = new WordParser();

    it('should parse text into words', function () {
        const sentences = wordParser.parse('Kim loves going to the cinema');

        expect(sentences).to.deep.equal(['Kim', 'loves', 'going', 'to', 'the', 'cinema']);
    });
});