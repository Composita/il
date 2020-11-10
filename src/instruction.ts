import { Clonable } from './clonable';
import { Descriptor, ComponentDescriptor } from './descriptor';

export enum OpCode {
    // math binary
    Add,
    Subtract,
    Multiply,
    Divide,
    Negate,
    Modulo,

    // compare
    Equal,
    Less,
    LessEqual,
    Greater,
    GreaterEqual,
    NotEqual,

    // unary invert
    Not,

    // logic binary ops
    LogicOr,
    LogicAnd,

    // new component
    New,
    Delete,

    Send, // send what, to
    Receive, // receive what, from
    Connect, // descA, interface
    Disconnect,
    CheckReceive, // syscall
    SysCall, // syscall
    ProcedureCall, // normal call
    Return,

    // load constants
    LoadConstantBoolean,
    LoadConstantText,
    LoadConstantCharacter,
    LoadConstantFloat,
    LoadConstantInteger,

    LoadDescriptor,
    LoadThis,

    Move,

    StoreArgument,
    LoadArgument,

    StoreLocalVariable,
    LoadLocalVariable,

    StoreVariable,
    LoadVariable,

    StoreCollectionVariable,
    LoadCollectionVariable,

    StoreConstantVariable,
    LoadConstantVariable,

    // concurrency
    Await,
    AcquireShared,
    ReleaseShared,
    AcquireExclusive,
    ReleaseExclusive,

    Branch,
    BranchTrue,
    BranchFalse,

    IsType,
}

export enum SystemCall {
    Write,
    WriteLine,
    WriteHex,
    Assert1,
    Assert2,
    Halt,
    Inc1,
    Inc2,
    Dec1,
    Dec2,
    Passivate,
    Count,
    Length,
    Sqrt,
    Sin,
    Cos,
    Tan,
    ArcSin,
    ArcCos,
    ArcTan,
    Random,
    Min,
    Max,
    ToCharacter,
    ToInteger,
    ToReal,
    ToText,
}

enum TextValueTag {
    Tag,
}
export class TextValue implements Clonable<TextValue> {
    constructor(public readonly value: string) {}

    protected readonly _textValueTag = TextValueTag.Tag;

    clone(): TextValue {
        return new TextValue(this.value);
    }
}

enum CharacterValueTag {
    Tag,
}
export class CharacterValue implements Clonable<CharacterValue> {
    constructor(public readonly value: string) {}

    protected readonly _characterValueTag = CharacterValueTag.Tag;

    clone(): CharacterValue {
        return new CharacterValue(this.value);
    }
}

enum FloatValueTag {
    Tag,
}
export class FloatValue implements Clonable<FloatValue> {
    constructor(public readonly value: number) {}

    protected readonly _floatValueTag = FloatValueTag.Tag;

    clone(): FloatValue {
        return new FloatValue(this.value);
    }
}

enum IntegerValueTag {
    Tag,
}
export class IntegerValue implements Clonable<IntegerValue> {
    constructor(public readonly value: number) {}

    protected readonly _integerValueTag = IntegerValueTag.Tag;

    clone(): IntegerValue {
        return new IntegerValue(this.value);
    }
}

enum BooleanValueTag {
    Tag,
}
export class BooleanValue implements Clonable<BooleanValue> {
    constructor(public readonly value: boolean) {}

    protected readonly _booleanValueTag = BooleanValueTag.Tag;

    clone(): BooleanValue {
        return new BooleanValue(this.value);
    }
}

enum SystemCallValueTag {
    Tag,
}
export class SystemCallValue implements Clonable<SystemCallValue> {
    constructor(public readonly value: SystemCall) {}

    protected readonly _systemCallValueTag = SystemCallValueTag.Tag;

    clone(): SystemCallValue {
        return new SystemCallValue(this.value);
    }
}

enum FieldIndexTag {
    Tag,
}
export class FieldIndex implements Clonable<FieldIndex> {
    constructor(public readonly index: number) {}

    protected readonly _fieldIndexTag = FieldIndexTag.Tag;

    clone(): FieldIndex {
        return new FieldIndex(this.index);
    }
}

enum LocalVariableIndexTag {
    Tag,
}
export class LocalVariableIndex implements Clonable<LocalVariableIndex> {
    constructor(public readonly index: number) {}

    protected readonly _localVariableIndexTag = LocalVariableIndexTag.Tag;

    clone(): LocalVariableIndex {
        return new LocalVariableIndex(this.index);
    }
}

enum IndexValueTag {
    Tag,
}
export class IndexValue implements Clonable<IndexValue> {
    constructor(public readonly index: number) {}

    protected readonly _indexValueTag = IndexValueTag.Tag;

    clone(): IndexValue {
        return new IndexValue(this.index);
    }
}

enum JumpOffsetTag {
    Tag,
}
export class JumpOffset implements Clonable<JumpOffset> {
    constructor(public readonly offset: number) {}

    protected readonly _jumpOffsetTag = JumpOffsetTag.Tag;

    clone(): JumpOffset {
        return new JumpOffset(this.offset);
    }
}

enum LabelTag {
    Tag,
}
export class Label implements Clonable<Label> {
    protected readonly _labelTag = LabelTag.Tag;

    clone(): Label {
        return new Label();
    }
}

export type InstructionOperand =
    | IntegerValue
    | FloatValue
    | BooleanValue
    | CharacterValue
    | TextValue
    | SystemCallValue
    | IndexValue
    | JumpOffset
    | Descriptor<never>
    | Label;

export type VariableValue =
    | IntegerValue
    | FloatValue
    | BooleanValue
    | CharacterValue
    | TextValue
    | ComponentDescriptor
    | undefined;

export class Instruction implements Clonable<Instruction> {
    constructor(private readonly opCode: OpCode, ...operands: Array<InstructionOperand>) {
        this.operands = new Array<InstructionOperand>(...operands);
    }

    private readonly operands: Array<InstructionOperand>;

    getOpCode(): OpCode {
        return this.opCode;
    }

    getOperands(): Array<InstructionOperand> {
        return this.operands;
    }

    clone(): Instruction {
        return new Instruction(this.opCode, ...this.operands.map((o) => o.clone()));
    }
}
