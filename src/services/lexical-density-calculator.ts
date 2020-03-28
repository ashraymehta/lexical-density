import {injectable} from 'inversify';
import {SentenceParser} from './sentence-parser';
import {NonLexicalWordsService} from './non-lexical-words-service';

@injectable()
export class LexicalDensityCalculator {
    private readonly sentenceParser: SentenceParser;
    private readonly nonLexicalWordsService: NonLexicalWordsService;

    constructor(lexicalWordsService: NonLexicalWordsService, sentenceParser: SentenceParser) {
        this.sentenceParser = sentenceParser;
        this.nonLexicalWordsService = lexicalWordsService;
    }

    public async calculate(text: string): Promise<{ sentenceLexicalDensities: number[]; overallLexicalDensity: number }> {
        const allNonLexicalWords = await this.nonLexicalWordsService.findAllNonLexicalWords();

        const sentences = this.sentenceParser.parse(text);

        const lexicalDensitiesForSentences = sentences.map(sentence => {
            const wordsFromSentence = sentence.words;

            const nonLexicalWords = wordsFromSentence.filter(word => !allNonLexicalWords.includes(word));
            const numberOfLexicalWords = nonLexicalWords.length;
            const numberOfTotalWords = wordsFromSentence.length;
            const lexicalDensity = numberOfLexicalWords / numberOfTotalWords;
            return {numberOfLexicalWords, numberOfTotalWords, lexicalDensity};
        });

        const totalWordsInText = lexicalDensitiesForSentences.map(value => value.numberOfTotalWords)
            .reduce((acc, val) => acc += val, 0);
        const lexicalWordsInText = lexicalDensitiesForSentences.map(value => value.numberOfLexicalWords)
            .reduce((acc, val) => acc += val, 0);

        const overallLexicalDensity = lexicalWordsInText / totalWordsInText;

        return {
            sentenceLexicalDensities: lexicalDensitiesForSentences.map(value => Number(value.lexicalDensity.toPrecision(2))),
            overallLexicalDensity: Number(overallLexicalDensity.toPrecision(2))
        };
    }
}