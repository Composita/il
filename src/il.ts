import { ComponentDescriptor, InterfaceDescriptor, Descriptor } from './descriptor';

export class IL {
    private readonly entryPoints: Array<ComponentDescriptor> = new Array<ComponentDescriptor>();

    pushEntry(descriptor: ComponentDescriptor): void {
        this.entryPoints.push(descriptor);
    }

    getEntryPoints(): Array<ComponentDescriptor> {
        return this.entryPoints;
    }

    private readonly components: Array<ComponentDescriptor> = new Array<ComponentDescriptor>();
    private readonly interfaces: Array<InterfaceDescriptor> = new Array<InterfaceDescriptor>();

    pushComponent(descriptor: ComponentDescriptor): number {
        return Descriptor.push(this.components, descriptor);
    }

    loadComponent(index: number): ComponentDescriptor {
        return Descriptor.load(this.components, index);
    }

    pushInterface(descriptor: InterfaceDescriptor): number {
        return Descriptor.push(this.interfaces, descriptor);
    }
    loadInterface(index: number): InterfaceDescriptor {
        return Descriptor.load(this.interfaces, index);
    }
}

export * from './descriptor';
export * from './instruction';
