import { Optional } from '@composita/ts-utility-types';
import { BuiltInTypeDescriptor } from './builtin';
import { MessageDirection, ProtocolType } from './enums';
import { Instruction } from './instruction';
import { SystemCallOperator } from './syscall';

export type TypeDescriptor = ComponentDescriptor | BuiltInTypeDescriptor;

export class DeclarationDescriptor {
    public readonly init = new CodeBlockDescriptor();
    public readonly constants = new Array<VariableDescriptor>();
    public readonly variables = new Array<VariableDescriptor>();
    public readonly procedures = new Array<ProcedureDescriptor>();
    public readonly components = new Array<ComponentDescriptor>();
}

export class ComponentDescriptor {
    public readonly offers = new Array<InterfaceDescriptor>();
    public readonly requires = new Array<InterfaceDescriptor>();
    public readonly declarations = new DeclarationDescriptor();
    public readonly implementations = new Array<ImplementationDescriptor>();
    public readonly begin = new CodeBlockDescriptor();
    public readonly activity = new CodeBlockDescriptor();
    public readonly finally = new CodeBlockDescriptor();
}

export class ProcedureDescriptor {
    constructor(public readonly returnType: Optional<TypeDescriptor>) {}
    public readonly parameters = new Array<VariableDescriptor>();
    public readonly declarations = new DeclarationDescriptor();
    public readonly begin = new CodeBlockDescriptor();
}

export class ImplementationDescriptor {
    constructor(public readonly reference: InterfaceDescriptor) {}
    public readonly declarations = new DeclarationDescriptor();
    public readonly begin = new CodeBlockDescriptor();
}

export class VariableDescriptor {
    constructor(public readonly type: TypeDescriptor, public readonly mutable: boolean) {}
    public readonly indexTypes = new Array<TypeDescriptor>();
}

export class CodeBlockDescriptor {
    public readonly instructions = new Array<Instruction>();
}

export class InterfaceDescriptor {
    public readonly protocols = new Array<ProtocolDescriptor>();
}

export class ProtocolDescriptor {
    constructor(public readonly type: ProtocolType) {}
    public readonly messages = new Array<MessageDescriptor>();
}

export class MessageDescriptor {
    constructor(public readonly direction: MessageDirection) {}
    public readonly data = new Array<TypeDescriptor>();
}

export class JumpDescriptor {
    constructor(public readonly offset: number) {}
}

export class SystemCallDescriptor {
    constructor(public readonly systemCall: SystemCallOperator, ...args: Array<TypeDescriptor>) {
        this.arguments = new Array<TypeDescriptor>(...args);
    }
    public readonly arguments: Array<TypeDescriptor>;
}
