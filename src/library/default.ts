import { AsyncContext } from "./async";

export class Default extends AsyncContext {
    public async request(req: any): Promise<void> {
        await setTimeout(async () => {
            
            this.reqCmdAdd(req);
        }, 3000);
    }
    public async response(): Promise<Object> {
        let response = await this.resCmdGet();
        return response;
    }
}