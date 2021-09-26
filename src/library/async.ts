interface RequestCommands {
  cmd: string
}

interface ResponseAnswers {
  cmd: string,
  response: Object
}

export abstract class AsyncContext {
  protected static requestCommands: Array<RequestCommands> = [];
  protected static responseAnswers: Array<ResponseAnswers> = [];
  public abstract request(req): Object;
  public abstract response(res): Object;

  protected reqCmdAdd = (cmd) => {
    AsyncContext.requestCommands.push(cmd);
    return AsyncContext.requestCommands;
  }
  protected cmdLoader = async(cmd) => {};
  protected cmdSplit = async(cmd) => {};
  protected option = async(...args) => {};
}
