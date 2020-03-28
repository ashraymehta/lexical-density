import {injectable} from 'inversify';
import {WordParser} from './word-parser';
import {Sentence} from '../models/sentence';

@injectable()
export class SentenceParser {
    private static readonly SentenceSeparator = '.';
    private readonly wordParser: WordParser;

    constructor(wordParser: WordParser) {
        this.wordParser = wordParser;
    }

    public parse(text: string): Sentence[] {
        return text.split(SentenceParser.SentenceSeparator)
            .filter(sentence => sentence.trim())
            .map(sentence => ({words: this.wordParser.parse(sentence)}));
    }
}