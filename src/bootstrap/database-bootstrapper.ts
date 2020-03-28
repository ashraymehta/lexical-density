import {mongoose} from '@typegoose/typegoose';
import {NonLexicalWordsService} from '../services/non-lexical-words-service';

export class DatabaseBootstrapper {
    private static readonly databaseUri = `mongodb://localhost:27017/lexical-density`;
    private readonly nonLexicalWordsService: NonLexicalWordsService;
    private readonly allNonLexicalWords = ['to', 'got', 'is', 'have', 'and', 'although', 'or', 'that', 'when', 'while', 'a', 'either',
        'more', 'much', 'neither', 'my', 'that', 'the', 'as', 'no', 'nor', 'not', 'at', 'between', 'in', 'of', 'without', 'I', 'you',
        'he', 'she', 'it', 'we', 'they', 'anybody', 'one'];

    constructor(nonLexicalWordsService: NonLexicalWordsService) {
        this.nonLexicalWordsService = nonLexicalWordsService;
    }

    public async bootstrap(): Promise<void> {
        await mongoose.connect(DatabaseBootstrapper.databaseUri, {useNewUrlParser: true, useUnifiedTopology: true});

        await this.nonLexicalWordsService.clearAll();

        for (const nonLexicalWord of this.allNonLexicalWords) {
            await this.nonLexicalWordsService.create(nonLexicalWord);
        }
    }
}