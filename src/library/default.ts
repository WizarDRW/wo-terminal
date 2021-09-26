import { AsyncContext } from "./async";

export class Default extends AsyncContext {
    public request(req: any): Object {
        console.log(this.reqCmdAdd(req));
        return req;
    }
    public response(res: any): Object {
        this.cmdLoader(res.data);
        return res;
    }
}