import {NonLexicalWord, NonLexicalWordModel} from '../models/non-lexical-words';

export class NonLexicalWordRepository {
    public async create(nonLexicalWord: NonLexicalWord): Promise<void> {
        await NonLexicalWordModel.create(nonLexicalWord);
    }

    public async findAll(): Promise<NonLexicalWord[]> {
        return NonLexicalWordModel.find().lean();
    }
}