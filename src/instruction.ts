import {
    InterfaceDescriptor,
    JumpDescriptor,
    MessageDescriptor,
    ProcedureDescriptor,
    SystemCallDescriptor,
    TypeDescriptor,
    VariableDescriptor,
} from './descriptor';
import { OperationCode } from './opcode';

export class Instruction {
    constructor(code: OperationCode, ...args: Array<InstructionArgument>) {
        this.code = code;
        this.arguments = new Array<InstructionArgument>(...args);
    }
    public readonly code: OperationCode;
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
