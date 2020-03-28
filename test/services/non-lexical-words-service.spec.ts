import {expect} from 'chai';
import {NonLexicalWord} from '../../src/models/non-lexical-words';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {NonLexicalWordRepository} from '../../src/repositories/non-lexical-word-repository';

describe('Non-Lexical Words Service', function () {
    const nonLexicalWordRepository = mock(NonLexicalWordRepository);
    const nonLexicalWordsService = new NonLexicalWordsService(instance(nonLexicalWordRepository));

    it('should find non-lexical words', async function () {
        when(nonLexicalWordRepository.findAll()).thenResolve([new NonLexicalWord('a'), new NonLexicalWord('the')]);

        const allNonLexicalWords = await nonLexicalWordsService.findAllNonLexicalWords();

        expect(allNonLexicalWords).to.deep.equal(['a', 'the']);
    });

    it('should create a non-lexical word', async function () {
        await nonLexicalWordsService.create('a');

        verify(nonLexicalWordRepository.create(deepEqual(new NonLexicalWord('a')))).once();
    });

    it('should clear all non-lexical words', async function () {
        await nonLexicalWordsService.clearAll();

        verify(nonLexicalWordRepository.removeAll()).once();
    });
});
