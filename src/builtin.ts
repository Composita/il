export type BuiltInTypeDescriptor =
    | IntegerDescriptor
    | FloatDescriptor
    | TextDescriptor
    | CharacterDescriptor
    | BooleanDescriptor;

enum IntegerDescriptorTag {
    Tag,
}
export class IntegerDescriptor {
    constructor(initialValue = 0) {
        this.initialValue = Math.trunc(initialValue);
    }
    public readonly initialValue: number;

    protected readonly _integerDescriptorTag = IntegerDescriptorTag.Tag;
}

enum FloatDescriptorTag {
    Tag,
}
export class FloatDescriptor {
    constructor(initialValue = 0) {
        this.initialValue = initialValue;
    }
    public readonly initialValue: number;

    protected readonly _floatDescriptorTag = FloatDescriptorTag.Tag;
}

enum TextDescriptorTag {
    Tag,
}
export class TextDescriptor {
    constructor(initialValue = '') {
        this.initialValue = initialValue;
    }
    public readonly initialValue: string;

    protected readonly _TextDescriptorTag = TextDescriptorTag.Tag;
}

enum CharacterDescriptorTag {
    Tag,
}
export class CharacterDescriptor {
    constructor(initialValue = '') {
        if (initialValue.length > 1) {
            throw new Error('CharacterDescriptor initialValue lenght > 1');
        }
        this.initialValue = initialValue;
    }
    public readonly initialValue: string;

    protected readonly _characterDescriptorTag = CharacterDescriptorTag.Tag;
}

enum BooleanDescriptorTag {
    Tag,
}
export class BooleanDescriptor {
    constructor(initialValue = false) {
        this.initialValue = initialValue;
    }
    public readonly initialValue: boolean;

    protected readonly _booleanDescriptorTag = BooleanDescriptorTag.Tag;
}
