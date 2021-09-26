import { AsyncContext } from "./async";

export class Default extends AsyncContext {
    public request(req: any): void {
        this.reqCmdAdd(req);
    }
    public response(): any {
        return this.resCmdGet();
    }
}