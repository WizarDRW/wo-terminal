import StaticAnswers from "../utils/staticCommands";

interface RequestCommands {
  cmd: String;
}

interface ResponseAnswers {
  cmd: RequestCommands;
  response: Object;
}

export abstract class AsyncContext {
  protected static requestCommands: Array<RequestCommands> = [];
  protected static responseAnswers: Array<ResponseAnswers> = [];
  public abstract request(req): any;
  public abstract response(): any;

  constructor() {
    AsyncContext.requestCommands = [];
    AsyncContext.responseAnswers = [];
  }

  protected reqCmdAdd = async (cmd) => {
    AsyncContext.requestCommands.push(cmd);
  };

  protected resCmdGet = async () => {
    if (AsyncContext.requestCommands.length > 0) {
      let lastIndex = AsyncContext.requestCommands.length - 1;
      AsyncContext.responseAnswers.push({
        cmd: AsyncContext.requestCommands[lastIndex],
        response:
          StaticAnswers[AsyncContext.requestCommands[lastIndex]] ??
          `command not found: ${AsyncContext.requestCommands[lastIndex]}`,
      });
      return AsyncContext.responseAnswers;
    } else return;
  };

  protected cmdLoader = async (cmd) => {};
  protected cmdSplit = async (cmd) => {};
  protected option = async (...args) => {};
}
