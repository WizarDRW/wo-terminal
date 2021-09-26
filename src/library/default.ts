import { AsyncContext } from "./async";

export class Default extends AsyncContext {
    public request(req: any): void {
        this.reqCmdAdd(req);
    }
    public async response(): Promise<Object> {
        return await this.resCmdGet();
    }
}