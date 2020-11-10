import { Clonable } from './clonable';
import { Instruction, VariableValue } from './instruction';

export abstract class Descriptor<T> implements Clonable<T> {
    constructor(public readonly name: string) {}

    abstract clone(): T;

    static push<T extends Descriptor<T>>(target: Array<T>, descriptor: T): number {
        return target.push(descriptor) - 1;
    }

    static load<T extends Descriptor<T>>(target: Array<T>, index: number): T {
        if (index >= target.length || index < 0) {
            throw new Error(`Invalid load index ${index}, target size ${target.length}.`);
        }
        return target[index];
    }
}

export class ComponentDescriptor extends Descriptor<ComponentDescriptor> {
    constructor(name: string) {
        super(name);
    }

    private readonly procedures: Array<ProcedureDescriptor> = new Array<ProcedureDescriptor>();
    private readonly implementations: Array<ImplementationDescriptor> = new Array<ImplementationDescriptor>();
    private readonly fields: Array<VariableDescriptorBase<never>> = new Array<VariableDescriptorBase<never>>();

    private readonly offers: Array<InterfaceDescriptor> = new Array<InterfaceDescriptor>();
    private readonly requires: Array<InterfaceDescriptor> = new Array<InterfaceDescriptor>();

    private readonly initCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();

    private readonly beginCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();
    private readonly activityCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();
    private readonly finallyCode: LocalCodeBlockDescriptor = new LocalCodeBlockDescriptor();

    clone(): ComponentDescriptor {
        const component = new ComponentDescriptor(this.name);
        this.procedures.forEach((p) => component.pushProcedure(p.clone()));
        this.implementations.forEach((i) => component.pushImplementation(i.clone()));
        this.fields.forEach((f) => component.pushField(f.clone()));
        this.offers.forEach((o) => component.pushOffer(o.clone()));
        this.requires.forEach((r) => component.pushRequires(r.clone()));
        component.initCode.getInstructions().push(...this.initCode.clone().getInstructions());
        component.beginCode.getInstructions().push(...this.beginCode.clone().getInstructions());
        component.activityCode.getInstructions().push(...this.activityCode.clone().getInstructions());
        component.finallyCode.getInstructions().push(...this.finallyCode.clone().getInstructions());
        return component;
    }

    getInitCode(): LocalCodeBlockDescriptor {
        return this.initCode;
    }

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

    pushField(descriptor: VariableDescriptorBase<never>): number {
        return Descriptor.push(this.fields, descriptor);
    }

    loadField(index: number): VariableDescriptorBase<unknown> {
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

export class ProtocolDescriptor extends Descriptor<ProtocolDescriptor> {
    constructor(private parent: InterfaceDescriptor) {
        super('@@__PROTOCOL__@@');
    }

    getParent(): InterfaceDescriptor {
        return this.parent;
    }

    clone(): ProtocolDescriptor {
        return new ProtocolDescriptor(this.parent.clone());
    }
}

export enum MessageDirection {
    IN,
    OUT,
}

export class MessageDescriptor extends Descriptor<MessageDescriptor> {
    constructor(name: string, private direction: MessageDirection) {
        super(name);
    }

    private readonly params: Array<VariableDescriptor> = new Array<VariableDescriptor>();

    getDirection(): MessageDirection {
        return this.direction;
    }

    loadParam(index: number): VariableDescriptor {
        return Descriptor.load(this.params, index);
    }

    pushParam(variable: VariableDescriptor): number {
        return Descriptor.push(this.params, variable);
    }

    clone(): MessageDescriptor {
        const descriptor = new MessageDescriptor(this.name, this.direction);
        descriptor.params.push(...this.params.map((p) => p.clone()));
        return descriptor;
    }
}

export class InterfaceDescriptor extends Descriptor<InterfaceDescriptor> {
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

    clone(): InterfaceDescriptor {
        const descriptor = new InterfaceDescriptor(this.name, this.min, this.max);
        this.protocols.forEach((p) => descriptor.pushProtocol(p.clone()));
        return descriptor;
    }
}

export abstract class CodeBlockDescriptor<T> extends Descriptor<T> {
    private readonly instructions: Array<Instruction> = new Array<Instruction>();

    getInstructions(): Array<Instruction> {
        return this.instructions;
    }
}

enum LocalCodeBlockDescriptorTag {
    Tag,
}
export class LocalCodeBlockDescriptor extends CodeBlockDescriptor<LocalCodeBlockDescriptor> {
    constructor() {
        super('@@__LOCAL_CODE_BLOCK__@@');
    }

    clone(): LocalCodeBlockDescriptor {
        const descriptor = new LocalCodeBlockDescriptor();
        this.getInstructions().forEach((i) => descriptor.getInstructions().push(i.clone()));
        return descriptor;
    }

    protected readonly _localCodeBlockDescriptor: LocalCodeBlockDescriptorTag = LocalCodeBlockDescriptorTag.Tag;
}

export class ProcedureDescriptor extends CodeBlockDescriptor<ProcedureDescriptor> {
    constructor(name: string, public readonly parent: ComponentDescriptor, public readonly paramTypes: Array<number>) {
        super(name);
    }

    clone(): ProcedureDescriptor {
        return new ProcedureDescriptor(this.name, this.parent.clone(), new Array<number>(...this.paramTypes));
    }
}

export class ImplementationDescriptor extends CodeBlockDescriptor<ImplementationDescriptor> {
    constructor(name: string, public readonly parent: ComponentDescriptor) {
        super(name);
    }

    clone(): ImplementationDescriptor {
        return new ImplementationDescriptor(this.name, this.parent.clone());
    }
}

export class VariableIndexDescriptor extends Descriptor<VariableIndexDescriptor> {
    constructor(private readonly index: Array<VariableValue>) {
        super('@@__VARIABLE_INDEX__@@');
    }

    getIndex(): Array<VariableValue> {
        return this.index;
    }

    clone(): VariableIndexDescriptor {
        return new VariableIndexDescriptor(this.index.map((i) => i?.clone()));
    }
}

enum VariableDescriptorBaseTag {
    Tag,
}
export abstract class VariableDescriptorBase<T> extends Descriptor<T> {
    protected readonly _variableDescriptorBaseTag: VariableDescriptorBaseTag = VariableDescriptorBaseTag.Tag;
}

export class VariableDescriptor extends VariableDescriptorBase<VariableDescriptor> {
    private value: VariableValue = undefined;

    getValue(): VariableValue {
        return this.value;
    }

    updateValue(value: VariableValue): void {
        this.value = value;
    }

    clone(): VariableDescriptor {
        const descriptor = new VariableDescriptor(this.name);
        descriptor.updateValue(this.value);
        return descriptor;
    }
}

export class CollectionVariableDescriptor extends VariableDescriptorBase<CollectionVariableDescriptor> {
    private values: Map<VariableIndexDescriptor, VariableValue> = new Map<VariableIndexDescriptor, VariableValue>();

    getValue(index: VariableIndexDescriptor): VariableValue {
        const value = this.values.get(index);
        if (value === undefined) {
            throw new Error(`Failed to lookup collection variable.`);
        }
        return value;
    }

    updateValue(index: VariableIndexDescriptor, value: VariableValue): void {
        this.values.set(index, value);
    }

    clone(): CollectionVariableDescriptor {
        const descriptor = new CollectionVariableDescriptor(this.name);
        this.values.forEach((v, k) => descriptor.values.set(k.clone(), v?.clone()));
        return descriptor;
    }
}
