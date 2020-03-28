import {expect} from 'chai';
import {mongoose} from '@typegoose/typegoose';
import {NonLexicalWord, NonLexicalWordModel} from '../../src/models/non-lexical-words';
import {NonLexicalWordRepository} from '../../src/repositories/non-lexical-word-repository';

describe('Non Lexical Word Repository', function () {
    const nonLexicalWordRepository = new NonLexicalWordRepository();

    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    });

    beforeEach(async () => {
        await NonLexicalWordModel.deleteMany({});
    });

    it('should save non-lexical words to the repository', async function () {
        await nonLexicalWordRepository.create(new NonLexicalWord('a'));

        expect(await NonLexicalWordModel.count({})).to.equal(1);
    });

    it('should find all non-lexical words from the repository', async function () {
        await nonLexicalWordRepository.create(new NonLexicalWord('a'));
        await nonLexicalWordRepository.create(new NonLexicalWord('the'));
        await nonLexicalWordRepository.create(new NonLexicalWord('to'));

        const savedNonLexicalWords = await nonLexicalWordRepository.findAll();

        expect(savedNonLexicalWords).to.be.of.length(3);
        expect(savedNonLexicalWords.map(w => w.word)).to.deep.equal(['a', 'the', 'to']);
    });

    it('should remove all non-lexical words from the repository', async function () {
        await nonLexicalWordRepository.create(new NonLexicalWord('a'));
        await nonLexicalWordRepository.create(new NonLexicalWord('the'));
        await nonLexicalWordRepository.create(new NonLexicalWord('to'));

        await nonLexicalWordRepository.removeAll();

        const savedNonLexicalWords = await nonLexicalWordRepository.findAll();

        expect(savedNonLexicalWords).to.be.empty;
    });

    after(async () => {
        await mongoose.disconnect();
    });
});