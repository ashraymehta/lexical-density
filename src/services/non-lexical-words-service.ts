import {injectable} from 'inversify';
import {NonLexicalWord} from '../models/non-lexical-words';
import {NonLexicalWordRepository} from '../repositories/non-lexical-word-repository';

@injectable()
export class NonLexicalWordsService {
    private readonly nonLexicalWordRepository: NonLexicalWordRepository;

    constructor(nonLexicalWordRepository: NonLexicalWordRepository) {
        this.nonLexicalWordRepository = nonLexicalWordRepository;
    }

    public async findAllNonLexicalWords(): Promise<string[]> {
        return (await this.nonLexicalWordRepository.findAll()).map(w => w.word);
    }

    public async create(word: string): Promise<void> {
        await this.nonLexicalWordRepository.create(new NonLexicalWord(word));
    }

    public async clearAll(): Promise<any> {
        await this.nonLexicalWordRepository.removeAll();
    }
}