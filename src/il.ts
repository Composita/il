import { ComponentDescriptor } from './descriptor';

export class IL {
    public readonly entryPoints: Array<ComponentDescriptor> = new Array<ComponentDescriptor>();

    public readonly components: Array<ComponentDescriptor> = new Array<ComponentDescriptor>();
}

export * from './descriptor';
export * from './instruction';
export * from './message';
