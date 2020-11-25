import { Optional } from '@composita/ts-utility-types';
import { BuiltInTypeDescriptor } from './builtin';
import { MessageDirection, ProtocolType } from './enums';
import { Instruction } from './instruction';
import { SystemCallOperator } from './syscall';

export type TypeDescriptor = ComponentDescriptor | BuiltInTypeDescriptor;

export class DeclarationDescriptor {
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
    constructor(returnType: Optional<TypeDescriptor>) {
        this.parameters = new Array<InterfaceDescriptor>();
        this.returnType = returnType;
        this.declarations = new DeclarationDescriptor();
        this.begin = new CodeBlockDescriptor();
    }
    public readonly parameters: Array<InterfaceDescriptor>;
    public readonly returnType: Optional<TypeDescriptor>;
    public readonly declarations: DeclarationDescriptor;
    public readonly begin: CodeBlockDescriptor;
}

export class ImplementationDescriptor {
    public readonly declarations = new DeclarationDescriptor();
    public readonly begin = new CodeBlockDescriptor();
}

export class VariableDescriptor {
    constructor(type: TypeDescriptor, mutable: boolean) {
        this.type = type;
        this.mutable = mutable;
        this.indexTypes = new Array<TypeDescriptor>();
    }
    public readonly type: TypeDescriptor;
    public readonly mutable: boolean;
    public readonly indexTypes: Array<TypeDescriptor>;
}

export class CodeBlockDescriptor {
    public readonly instructions = new Array<Instruction>();
}

export class InterfaceDescriptor {
    public readonly protocols = new Array<ProtocolDescriptor>();
}

export class ProtocolDescriptor {
    constructor(protocolType: ProtocolType) {
        this.type = protocolType;
        this.messages = new Array<MessageDescriptor>();
    }
    public readonly type: ProtocolType;
    public readonly messages: Array<MessageDescriptor>;
}

export class MessageDescriptor {
    constructor(direction: MessageDirection) {
        this.direction = direction;
        this.data = new Array<TypeDescriptor>();
    }
    public readonly direction: MessageDirection;
    public readonly data: Array<TypeDescriptor>;
}

export class JumpDescriptor {
    constructor(offset: number) {
        this.offset = offset;
    }
    public readonly offset: number;
}

export class SystemCallDescriptor {
    constructor(systemCall: SystemCallOperator, ...args: Array<TypeDescriptor>) {
        this.systemCall = systemCall;
        this.arguments = new Array<TypeDescriptor>(...args);
    }
    public readonly systemCall: SystemCallOperator;
    public readonly arguments: Array<TypeDescriptor>;
}
