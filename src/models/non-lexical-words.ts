import {getModelForClass, prop} from '@typegoose/typegoose';

export class NonLexicalWord {
    @prop()
    public readonly word: string;

    constructor(word: string) {
        this.word = word;
    }
}

export const NonLexicalWordModel = getModelForClass(NonLexicalWord, {schemaOptions: {versionKey: false}});