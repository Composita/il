import { ComponentDescriptor } from './descriptor';

export class IL {
    public readonly entryPoints: Array<ComponentDescriptor> = new Array<ComponentDescriptor>();
}

export { Descriptor, ComponentDescriptor, ComponentPart, ImplementationDescriptor } from './descriptor';
export {
    OpCode,
    Instruction,
    SendInstruction,
    ReceiveInstruction,
    NewComponentInstruction,
    ConnectInstruction,
    LoadInstraction,
    TextLoadInstruction,
    BooleanLoadInstruction,
    IntegerLoadInstruction,
    FloatLoadInstruction,
    SysCall,
    SysCallInstruction,
} from './instruction';
export { Message } from './message';
