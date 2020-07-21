import { Descriptor } from './descriptor';

export enum OpCode {
    Add,
    Subtract,
    Mul,
    Div,
    Negate,
    Mod,
    Equal,
    Less,
    LessEqual,
    Greater,
    GreaterEqual,
    NotEqual,
    Not,
    LogicOr,
    LogicAnd,
    New,
    Send,
    Await,
    Receive,
    Connect,
    CheckReceive,
    SysCall,
    ProcedureCall,
    Return,
    LoadBool,
    LoadText,
    LoadFloat,
    LoadInteger,
    LoadDescriptor,
    StoreBool,
    StoreText,
    StoreFloat,
    StoreInteger,
    StoreDescriptor,
    Branch,
    BranchTrue,
    BranchFalse,
    IsType,
}

export enum SystemCall {
    Write,
    WriteLine,
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

export type InstructionOperand =
    | IntegerValue
    | FloatValue
    | BooleanValue
    | CharacterValue
    | TextValue
    | SystemCallValue
    | Descriptor;

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
