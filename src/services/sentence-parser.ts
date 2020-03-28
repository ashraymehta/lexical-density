export class SentenceParser {
    private static readonly WordSeparator = ' ';
    private static readonly SentenceSeparator = '.';

    public parse(text: string): Sentence[] {
        return text.split(SentenceParser.SentenceSeparator)
            .filter(sentence => sentence.trim())
            .map(sentence => ({
                words: sentence.split(SentenceParser.WordSeparator).filter(word => word)
            }));
    }
}

export interface Sentence {
    words: string[];
}