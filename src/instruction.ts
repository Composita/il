import { Optional } from '@composita/ts-utility-types';
import { Message } from './message';
import { ComponentDescriptor } from './descriptor';

export enum OpCode {
    NewComponent,
    Send,
    Receive,
    Connect,
    CheckReceive,
    SysCall,
    ProcedureCall,
    LoadBool,
    LoadText,
    LoadFloat,
    LoadInteger,
    StoreBool,
    StoreText,
    StoreFloat,
    StoreInteger,
    Branch,
    BranchTrue,
    BranchFalse,
}

export abstract class Instruction {
    abstract getOpCode(): OpCode;
}

export class SendInstruction extends Instruction {
    constructor(private readonly record: Message) {
        super();
    }

    private targetMailbox: Optional<number>;

    getOpCode(): OpCode {
        return OpCode.Send;
    }

    setTargetMailbox(target: number): void {
        this.targetMailbox = target;
    }

    getTarget(): number {
        if (this.targetMailbox === undefined) {
            throw new Error('Unknown target mailbox.');
        }
        return this.targetMailbox;
    }

    getMessage(): Message {
        return this.record;
    }
}

export class ReceiveInstruction extends Instruction {
    getOpCode(): OpCode {
        return OpCode.Receive;
    }
}

export class NewComponentInstruction extends Instruction {
    constructor(private readonly descriptor: ComponentDescriptor) {
        super();
    }

    getOpCode(): OpCode {
        return OpCode.NewComponent;
    }

    getDescriptor(): ComponentDescriptor {
        return this.descriptor;
    }
}

export class ConnectInstruction extends Instruction {
    constructor(
        private readonly server: ComponentDescriptor,
        private readonly client: ComponentDescriptor,
        private readonly service: string,
    ) {
        super();
    }

    getOpCode(): OpCode {
        return OpCode.Connect;
    }

    getServer(): ComponentDescriptor {
        return this.server;
    }

    getClient(): ComponentDescriptor {
        return this.client;
    }

    getService(): string {
        return this.service;
    }
}

type LoadData = string | number | boolean;

export abstract class LoadInstraction<T extends LoadData> extends Instruction {
    constructor(private readonly data: T) {
        super();
    }

    getData(): LoadData {
        return this.data;
    }
}

export class TextLoadInstruction extends LoadInstraction<string> {
    getOpCode(): OpCode {
        return OpCode.LoadText;
    }
}

export class BooleanLoadInstruction extends LoadInstraction<boolean> {
    getOpCode(): OpCode {
        return OpCode.LoadBool;
    }
}

export class IntegerLoadInstruction extends LoadInstraction<number> {
    getOpCode(): OpCode {
        return OpCode.LoadInteger;
    }
}

export class FloatLoadInstruction extends LoadInstraction<number> {
    getOpCode(): OpCode {
        return OpCode.LoadFloat;
    }
}

export enum SysCall {
    Write,
    Writeline,
    SystemTime,
}

export class SysCallInstruction extends Instruction {
    constructor(private readonly sysCall: SysCall) {
        super();
    }

    getSysCall(): SysCall {
        return this.sysCall;
    }

    getOpCode(): OpCode {
        return OpCode.SysCall;
    }
}
