import {injectable} from 'inversify';
import {Sentence} from '../models/sentence';
import {SentenceParser} from './sentence-parser';
import {NonLexicalWordsService} from './non-lexical-words-service';
import sum = require('lodash.sum');
import round = require('lodash.round');

@injectable()
export class LexicalDensityCalculator {
    private readonly sentenceParser: SentenceParser;
    private readonly nonLexicalWordsService: NonLexicalWordsService;

    constructor(lexicalWordsService: NonLexicalWordsService, sentenceParser: SentenceParser) {
        this.sentenceParser = sentenceParser;
        this.nonLexicalWordsService = lexicalWordsService;
    }

    public async calculate(text: string): Promise<{ sentenceLexicalDensities: number[]; overallLexicalDensity: number }> {
        const allNonLexicalWords = (await this.nonLexicalWordsService.findAllNonLexicalWords()).map(value => value.toLowerCase());
        const sentences = this.sentenceParser.parse(text);

        const lexicalDensitiesForSentences = sentences.map(sentence =>
            this.calculateLexicalDensityForSentence(sentence, allNonLexicalWords));

        const totalWordsInText = sum(lexicalDensitiesForSentences.map(value => value.numberOfTotalWords));
        const lexicalWordsInText = sum(lexicalDensitiesForSentences.map(value => value.numberOfLexicalWords));

        const overallLexicalDensity = lexicalWordsInText / totalWordsInText;
        return {
            sentenceLexicalDensities: lexicalDensitiesForSentences.map(value => round(value.lexicalDensity, 2)),
            overallLexicalDensity: round(overallLexicalDensity, 2)
        };
    }

    private calculateLexicalDensityForSentence(sentence: Sentence, allNonLexicalWords: string[]) {
        const wordsFromSentence = sentence.words;

        const nonLexicalWords = wordsFromSentence.filter(word => !allNonLexicalWords.includes(word.toLowerCase()));
        const numberOfLexicalWords = nonLexicalWords.length;
        const numberOfTotalWords = wordsFromSentence.length;
        const lexicalDensity = numberOfLexicalWords / numberOfTotalWords;
        return {numberOfLexicalWords, numberOfTotalWords, lexicalDensity};
    }
}