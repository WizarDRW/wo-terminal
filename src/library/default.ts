import { AsyncContext } from "./async";

export class Default extends AsyncContext {
  public async request(req: any): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.reqCmdAdd(req);
      resolve(true);
    });
  }
  public async response(): Promise<Object> {
    return new Promise((resolve, reject) => {
      let response = this.resCmdGet();
      resolve(response);
    });
  }
}
