import {injectable} from 'inversify';
import {Logger} from '../utils/logger';
import {NonLexicalWord} from '../models/non-lexical-words';
import {NonLexicalWordRepository} from '../repositories/non-lexical-word-repository';

@injectable()
export class NonLexicalWordsService {
    private readonly nonLexicalWordRepository: NonLexicalWordRepository;
    private readonly logger = Logger.getLogger(NonLexicalWordsService.name);

    constructor(nonLexicalWordRepository: NonLexicalWordRepository) {
        this.nonLexicalWordRepository = nonLexicalWordRepository;
    }

    public async findAllNonLexicalWords(): Promise<string[]> {
        return (await this.nonLexicalWordRepository.findAll()).map(w => w.word);
    }

    public async create(word: string): Promise<void> {
        this.logger.info(`Saving non-lexical word [${word}].`);
        await this.nonLexicalWordRepository.create(new NonLexicalWord(word));
    }

    public async clearAll(): Promise<any> {
        this.logger.info(`Clearing all saved non-lexical words.`);
        await this.nonLexicalWordRepository.removeAll();
    }
}