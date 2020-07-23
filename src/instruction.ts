import { Descriptor } from './descriptor';

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
export class TextValue {
    constructor(public readonly value: string) {}

    protected readonly _textValueTag = TextValueTag.Tag;
}

enum CharacterValueTag {
    Tag,
}
export class CharacterValue {
    constructor(public readonly value: string) {}

    protected readonly _characterValueTag = CharacterValueTag.Tag;
}

enum FloatValueTag {
    Tag,
}
export class FloatValue {
    constructor(public readonly value: number) {}

    protected readonly _floatValueTag = FloatValueTag.Tag;
}

enum IntegerValueTag {
    Tag,
}
export class IntegerValue {
    constructor(public readonly value: number) {}

    protected readonly _integerValueTag = IntegerValueTag.Tag;
}

enum BooleanValueTag {
    Tag,
}
export class BooleanValue {
    constructor(public readonly value: boolean) {}

    protected readonly _booleanValueTag = BooleanValueTag.Tag;
}

enum SystemCallValueTag {
    Tag,
}
export class SystemCallValue {
    constructor(public readonly value: SystemCall) {}

    protected readonly _systemCallValueTag = SystemCallValueTag.Tag;
}

enum FieldIndexTag {
    Tag,
}
export class FieldIndex {
    constructor(public readonly index: number) {}

    protected readonly _fieldIndexTag = FieldIndexTag.Tag;
}

enum LocalVariableIndexTag {
    Tag,
}
export class LocalVariableIndex {
    constructor(public readonly index: number) {}

    protected readonly _localVariableIndexTag = LocalVariableIndexTag.Tag;
}

enum IndexValueTag {
    Tag,
}
export class IndexValue {
    constructor(public readonly index: number) {}

    protected readonly _indexValueTag = IndexValueTag.Tag;
}

enum JumpOffsetTag {
    Tag,
}
export class JumpOffset {
    constructor(public readonly offset: number) {}

    protected readonly _jumpOffsetTag = JumpOffsetTag.Tag;
}

enum LabelTag {
    Tag,
}
export class Label {
    protected readonly _labelTag = LabelTag.Tag;
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
    | Descriptor
    | Label;

export class Instruction {
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
}
