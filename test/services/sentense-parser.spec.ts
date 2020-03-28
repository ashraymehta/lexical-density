import {expect} from 'chai';
import {SentenceParser} from '../../src/services/sentence-parser';
import {Sentence} from '../../src/models/sentence';

describe('Sentence Parser', function () {
    const sentenceParser = new SentenceParser();

    it('should parse text into sentence', function () {
        const sentences = sentenceParser.parse('Kim loves going to the cinema');

        expect(sentences).to.deep.equal([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']}]);
    });

    it('should parse text into sentence ignoring full-stop', function () {
        const sentences = sentenceParser.parse('Kim loves going to the cinema.');

        expect(sentences).to.deep.equal([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']}]);
    });

    it('should parse text into sentence ignoring white-space', function () {
        const sentences = sentenceParser.parse(' Kim loves going to the cinema. ');

        expect(sentences).to.deep.equal([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']}]);
    });

    it('should parse text into multiple sentences', function () {
        const sentences = sentenceParser.parse(`Kim loves going to the cinema. John also likes to visit the cinema.`);

        expect(sentences).to.deep.equal([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']},
            <Sentence>{words: ['John', 'also', 'likes', 'to', 'visit', 'the', 'cinema']}]);
    });

    it('should parse text into multiple sentences ignoring white-space', function () {
        const sentences = sentenceParser.parse(` Kim loves going to the cinema.  John also likes to visit the cinema. `);

        expect(sentences).to.deep.equal([<Sentence>{words: ['Kim', 'loves', 'going', 'to', 'the', 'cinema']},
            <Sentence>{words: ['John', 'also', 'likes', 'to', 'visit', 'the', 'cinema']}]);
    });
});