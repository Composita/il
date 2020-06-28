export class Message {
    constructor(public readonly sender: number, public readonly type: string, ...data: Array<unknown>) {
        this.data = data;
    }

    public readonly data: Array<unknown>;
}
