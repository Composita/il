import { Optional } from '@composita/ts-utility-types';
import { BuiltInTypeDescriptor } from './builtin';
import { ProtocolType } from './enums';
import { Instruction } from './instruction';
import { SystemCallOperation } from './syscall';

export type TypeDescriptor = ComponentDescriptor | BuiltInTypeDescriptor | InterfaceDescriptor;

export type DeclarationContainer = ComponentDescriptor | ProcedureDescriptor | ImplementationDescriptor;

export class DeclarationDescriptor {
    public readonly init = new CodeBlockDescriptor();
    public readonly variables = new Array<VariableDescriptor>();
    public readonly procedures = new Array<ProcedureDescriptor>();
    public readonly components = new Array<ComponentDescriptor>();
}

export class ComponentDescriptor {
    constructor(public readonly identifier: string) {}
    public readonly offers = new Array<InterfaceDescriptor>();
    public readonly requires = new Array<InterfaceDescriptor>();
    public readonly declarations = new DeclarationDescriptor();
    public readonly implementations = new Array<ImplementationDescriptor>();
    public readonly begin = new CodeBlockDescriptor();
    public readonly activity = new CodeBlockDescriptor();
    public readonly finally = new CodeBlockDescriptor();
}

export class ProcedureDescriptor {
    constructor(public readonly identifier: string, public readonly returnType: Optional<TypeDescriptor>) {}
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
    constructor(
        public readonly identifier: string,
        public readonly type: TypeDescriptor,
        public readonly mutable: boolean,
    ) {}
    public readonly indexTypes = new Array<TypeDescriptor>();
}

export class CodeBlockDescriptor {
    public readonly instructions = new Array<Instruction>();
}

export class InterfaceDescriptor {
    constructor(public readonly identifier: string) {}
    public readonly protocols = new Array<ProtocolDescriptor>();
}

export class ProtocolDescriptor {
    constructor(public readonly type: ProtocolType) {}
    public readonly messages = new Array<MessageDescriptor>();
}

export class MessageDescriptor {
    constructor(public readonly identifier: string) {}
    public readonly data = new Array<TypeDescriptor>();
}

export class JumpDescriptor {
    constructor(public readonly offset: number) {}
}

export class SystemCallDescriptor {
    constructor(public readonly systemCall: SystemCallOperation, ...args: Array<TypeDescriptor>) {
        this.arguments = new Array<TypeDescriptor>(...args);
    }
    public readonly arguments: Array<TypeDescriptor>;
}
