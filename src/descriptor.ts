import { Instruction, InstructionOperand } from './instruction';

export abstract class Descriptor {
    constructor(public readonly name: string) {}

    static push<T extends Descriptor>(target: Array<T>, descriptor: T): number {
        return target.push(descriptor) - 1;
    }

    static load<T extends Descriptor>(target: Array<T>, index: number): T {
        if (target.length >= index || index < 0) {
            throw new Error(`Invalid procedure index.`);
        }
        return target[index];
    }
}

export class ComponentDescriptor extends Descriptor {
    constructor(name: string) {
        super(name);
    }

    private readonly procedures: Array<ProcedureDescriptor> = new Array<ProcedureDescriptor>();
    private readonly implementations: Array<ImplementationDescriptor> = new Array<ImplementationDescriptor>();
    private readonly fields: Array<VariableDescriptor> = new Array<VariableDescriptor>();

    private readonly offers: Array<InterfaceDescriptor> = new Array<InterfaceDescriptor>();
    private readonly requires: Array<InterfaceDescriptor> = new Array<InterfaceDescriptor>();

    private readonly beginCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();
    private readonly activityCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();
    private readonly finallyCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();

    getBeginCode(): LocalCodeBlockDescriptor {
        return this.beginCode;
    }

    getActivityCode(): LocalCodeBlockDescriptor {
        return this.activityCode;
    }

    getFinallyCode(): LocalCodeBlockDescriptor {
        return this.finallyCode;
    }

    pushProcedure(descriptor: ProcedureDescriptor): number {
        return Descriptor.push(this.procedures, descriptor);
    }

    loadProcedure(index: number): ProcedureDescriptor {
        return Descriptor.load(this.procedures, index);
    }

    pushImplementation(descriptor: ImplementationDescriptor): number {
        return Descriptor.push(this.implementations, descriptor);
    }

    loadImplementation(index: number): ImplementationDescriptor {
        return Descriptor.load(this.implementations, index);
    }

    pushField(descriptor: VariableDescriptor): number {
        return Descriptor.push(this.fields, descriptor);
    }

    loadField(index: number): VariableDescriptor {
        return Descriptor.load(this.fields, index);
    }

    pushOffer(descriptor: InterfaceDescriptor): number {
        return Descriptor.push(this.offers, descriptor);
    }

    loadOffer(index: number): InterfaceDescriptor {
        return Descriptor.load(this.offers, index);
    }

    pushRequires(descriptor: InterfaceDescriptor): number {
        return Descriptor.push(this.requires, descriptor);
    }

    loadRequires(index: number): InterfaceDescriptor {
        return Descriptor.load(this.requires, index);
    }
}

export class ProtocolDescriptor extends Descriptor {
    constructor(private parent: InterfaceDescriptor) {
        super('@@__PROTOCOL__@@');
    }

    getParent(): InterfaceDescriptor {
        return this.parent;
    }
}

export class InterfaceDescriptor extends Descriptor {
    constructor(name: string, private min: number, private max: number) {
        super(name);
    }

    private protocols: Array<ProtocolDescriptor> = new Array<ProtocolDescriptor>();

    loadProtocol(index: number): ProtocolDescriptor {
        return Descriptor.load(this.protocols, index);
    }

    pushProtocol(descriptor: ProtocolDescriptor): number {
        return Descriptor.push(this.protocols, descriptor);
    }

    getMin(): number {
        return this.min;
    }

    getMax(): number {
        return this.max;
    }
}

export abstract class CodeBlockDescriptor extends Descriptor {
    private readonly instructions: Array<Instruction> = new Array<Instruction>();

    getInstructions(): Array<Instruction> {
        return this.instructions;
    }
}

enum LocalCodeBlockDescriptorTag {
    Tag,
}
export class LocalCodeBlockDescriptor extends CodeBlockDescriptor {
    constructor() {
        super('@@__LOCAL_CODE_BLOCK__@@');
    }

    protected readonly _localCodeBlockDescriptor: LocalCodeBlockDescriptorTag = LocalCodeBlockDescriptorTag.Tag;
}

export class ProcedureDescriptor extends CodeBlockDescriptor {
    constructor(name: string, public readonly parent: ComponentDescriptor, public readonly paramTypes: Array<number>) {
        super(name);
    }
}

export class ImplementationDescriptor extends CodeBlockDescriptor {
    constructor(name: string, public readonly parent: ComponentDescriptor) {
        super(name);
    }
}

export class VariableIndexDescriptor extends Descriptor {
    constructor(private readonly index: Array<InstructionOperand>) {
        super('@@__VARIABLE_INDEX__@@');
    }

    getIndex(): Array<InstructionOperand> {
        return this.index;
    }
}

export class VariableDescriptor extends Descriptor {
    constructor(name: string, private readonly index: VariableIndexDescriptor) {
        super(name);
    }

    getIndex(): VariableIndexDescriptor {
        return this.index;
    }
}
