import {injectable} from 'inversify';

@injectable()
export class WordParser {
    private static readonly WordSeparator = ' ';

    public parse(text: string): string[] {
        return text.split(WordParser.WordSeparator).filter(word => word);
    }
}