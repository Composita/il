import { Instruction, SendInstruction } from './instruction';

export abstract class Descriptor {}

export enum ComponentPart {
    Begin,
    Activity,
    Finally,
}

export class ComponentDescriptor extends Descriptor {
    constructor(public readonly name: string) {
        super();
    }

    public readonly offers: Array<ImplementationDescriptor> = new Array<ImplementationDescriptor>();
    public readonly requires: Array<string> = new Array<string>();

    public readonly beginCode: Array<Instruction> = Array<Instruction>();
    public readonly activityCode: Array<Instruction> = Array<Instruction>();
    public readonly finallyCode: Array<Instruction> = Array<Instruction>();
}

export class ImplementationDescriptor extends Descriptor {
    constructor(public readonly name: string) {
        super();
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
