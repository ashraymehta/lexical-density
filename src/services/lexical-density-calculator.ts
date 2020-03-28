import {NonLexicalWordsService} from './non-lexical-words-service';

export class LexicalDensityCalculator {
    private readonly nonLexicalWordsService: NonLexicalWordsService;

    constructor(lexicalWordsService: NonLexicalWordsService) {
        this.nonLexicalWordsService = lexicalWordsService;
    }

    public async calculateForSentence(sentence: string): Promise<number> {
        const allNonLexicalWords = await this.nonLexicalWordsService.findAllNonLexicalWords();
        const wordsFromSentence = sentence.split(' ');
        const numberOfLexicalWords = wordsFromSentence.filter(word => !allNonLexicalWords.includes(word)).length;
        const lexicalDensity = numberOfLexicalWords / wordsFromSentence.length;
        return Number(lexicalDensity.toPrecision(2));
    }
}