import {injectable} from 'inversify';
import {NonLexicalWord} from '../models/non-lexical-words';
import {NonLexicalWordRepository} from '../repositories/non-lexical-word-repository';

@injectable()
export class NonLexicalWordsService {
    private readonly nonLexicalWordRepository: NonLexicalWordRepository;
    private readonly allNonLexicalWords = ['to', 'got', 'is', 'have', 'and', 'although', 'or', 'that', 'when', 'while', 'a', 'either',
        'more', 'much', 'neither', 'my', 'that', 'the', 'as', 'no', 'nor', 'not', 'at', 'between', 'in', 'of', 'without', 'I', 'you',
        'he', 'she', 'it', 'we', 'they', 'anybody', 'one'];

    constructor(nonLexicalWordRepository: NonLexicalWordRepository) {
        this.nonLexicalWordRepository = nonLexicalWordRepository;
    }

    public async findAllNonLexicalWords(): Promise<string[]> {
        return this.allNonLexicalWords;
    }

    public async create(word: string): Promise<void> {
        await this.nonLexicalWordRepository.create(new NonLexicalWord(word));
    }

    public async clearAll(): Promise<any> {
        await this.nonLexicalWordRepository.removeAll();
    }
}