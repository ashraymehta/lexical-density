import {NonLexicalWordsService} from './non-lexical-words-service';

export class LexicalDensityCalculator {
    private static readonly WordSeparator = ' ';
    private static readonly SentenceSeparator = '.';
    private readonly nonLexicalWordsService: NonLexicalWordsService;

    constructor(lexicalWordsService: NonLexicalWordsService) {
        this.nonLexicalWordsService = lexicalWordsService;
    }

    public async calculate(text: string): Promise<{ sentenceLexicalDensities: number[]; overallLexicalDensity: number }> {
        const allNonLexicalWords = await this.nonLexicalWordsService.findAllNonLexicalWords();

        const sentences = text.split(LexicalDensityCalculator.SentenceSeparator).filter(sentence => sentence);

        const lexicalDensitiesForSentences = sentences.map(sentence => {
            const wordsFromSentence = sentence.split(LexicalDensityCalculator.WordSeparator).filter(word => word);

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