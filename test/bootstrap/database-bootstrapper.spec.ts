import {expect} from 'chai';
import {mongoose} from '@typegoose/typegoose';
import {DatabaseBootstrapper} from '../../src/bootstrap/database-bootstrapper';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {NonLexicalWordRepository} from '../../src/repositories/non-lexical-word-repository';

describe('Database Bootstrapper', function () {
    const databaseBootstrapper = new DatabaseBootstrapper(new NonLexicalWordsService(new NonLexicalWordRepository()));
    const nonLexicalWordRepository = new NonLexicalWordRepository();

    it('should connect to database, clear it and seed non-lexical words', async function () {
        await databaseBootstrapper.bootstrap();

        const nonLexicalWords = await nonLexicalWordRepository.findAll();
        expect(nonLexicalWords).to.be.of.length(36);
    });

    after(async () => {
        await mongoose.disconnect();
    })
});