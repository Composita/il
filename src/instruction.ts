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

export type InstructionOperand = number | boolean | string | SystemCall | Descriptor;

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
