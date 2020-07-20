import { Instruction, SendInstruction } from './instruction';

export abstract class Descriptor {
    constructor(public readonly name: string) {}
}

export enum ComponentPart {
    Begin,
    Activity,
    Finally,
}

export class ComponentDescriptor extends Descriptor {
    constructor(name: string) {
        super(name);
    }

    public readonly procedures: Array<ProcedureDescriptor> = new Array<ProcedureDescriptor>();

    public readonly offers: Array<ImplementationDescriptor> = new Array<ImplementationDescriptor>();
    public readonly requires: Array<string> = new Array<string>();

    public readonly beginCode: Array<Instruction> = Array<Instruction>();
    public readonly activityCode: Array<Instruction> = Array<Instruction>();
    public readonly finallyCode: Array<Instruction> = Array<Instruction>();
}

export class ProcedureDescriptor extends Descriptor {
    constructor(name: string) {
        super(name);
    }
}

export class ImplementationDescriptor extends Descriptor {
    constructor(name: string) {
        super(name);
    }

    public readonly code: Array<Instruction> = new Array<Instruction>();

    setMailboxId(id: number): void {
        this.code.forEach((instruction) => {
            if (instruction instanceof SendInstruction) {
                instruction.setTargetMailbox(id);
            }
        });
    }
}
