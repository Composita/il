export type BuiltInTypeDescriptor =
    | IntegerDescriptor
    | FlaotDescriptor
    | TextDescriptor
    | CharacterDescriptor
    | BooleanDescriptor;

enum IntegerDescriptorTag {
    Tag,
}
export class IntegerDescriptor {
    protected readonly _integerDescriptorTag = IntegerDescriptorTag.Tag;
}

enum FloatDescriptorTag {
    Tag,
}
export class FlaotDescriptor {
    protected readonly _floatDescriptorTag = FloatDescriptorTag.Tag;
}

enum TextDescriptorTag {
    Tag,
}
export class TextDescriptor {
    protected readonly _TextDescriptorTag = TextDescriptorTag.Tag;
}

enum CharacterDescriptorTag {
    Tag,
}
export class CharacterDescriptor {
    protected readonly _characterDescriptorTag = CharacterDescriptorTag.Tag;
}

enum BooleanDescriptorTag {
    Tag,
}
export class BooleanDescriptor {
    protected readonly _booleanDescriptorTag = BooleanDescriptorTag.Tag;
}
