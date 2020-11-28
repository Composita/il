import {
    InterfaceDescriptor,
    JumpDescriptor,
    MessageDescriptor,
    ProcedureDescriptor,
    SystemCallDescriptor,
    TypeDescriptor,
    VariableDescriptor,
} from './descriptor';
import { OperatorCode } from './opcode';

export class Instruction {
    constructor(code: OperatorCode, ...args: Array<InstructionArgument>) {
        this.code = code;
        this.arguments = new Array<InstructionArgument>(...args);
    }
    public readonly code: OperatorCode;
    public readonly arguments: Array<InstructionArgument>;
}

export type InstructionArgument =
    | SystemCallDescriptor
    | MessageDescriptor
    | TypeDescriptor
    | VariableDescriptor
    | ProcedureDescriptor
    | InterfaceDescriptor
    | JumpDescriptor;
