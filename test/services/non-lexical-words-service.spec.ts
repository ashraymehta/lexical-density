import {expect} from 'chai';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {NonLexicalWord} from '../../src/models/non-lexical-words';
import {NonLexicalWordsService} from '../../src/services/non-lexical-words-service';
import {NonLexicalWordRepository} from '../../src/repositories/non-lexical-word-repository';

describe('Non-Lexical Words Service', function () {
    const expectedListOfNonLexicalWords = ['to', 'got', 'is', 'have', 'and', 'although', 'or', 'that', 'when', 'while', 'a', 'either',
        'more', 'much', 'neither', 'my', 'that', 'the', 'as', 'no', 'nor', 'not', 'at', 'between', 'in', 'of', 'without', 'I', 'you',
        'he', 'she', 'it', 'we', 'they', 'anybody', 'one'];

    const nonLexicalWordRepository = mock(NonLexicalWordRepository);
    const nonLexicalWordsService = new NonLexicalWordsService(instance(nonLexicalWordRepository));

    it('should return a pre-defined list of non-lexical words', async function () {
        const allNonLexicalWords = await nonLexicalWordsService.findAllNonLexicalWords();

        expect(allNonLexicalWords).to.deep.equal(expectedListOfNonLexicalWords);
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
