import { ComponentDescriptor, InterfaceDescriptor } from './descriptor';

export class IL {
    public readonly entryPoints = new Array<ComponentDescriptor>();
    public readonly components = new Array<ComponentDescriptor>();
    public readonly interfaces = new Array<InterfaceDescriptor>();
}

export * from './builtin';
export * from './descriptor';
export * from './enums';
export * from './instruction';
export * from './opcode';
export * from './syscall';
