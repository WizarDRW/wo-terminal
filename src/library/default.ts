import { AsyncContext } from "./async";

export class Default extends AsyncContext {
  public async request(req: any): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.reqCmdAdd(req);
        resolve(true);
      }, 3000);
    });
  }
  public async response(): Promise<Object> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let response = this.resCmdGet();
            resolve(response);
        }, 3000);
    });
  }
}
