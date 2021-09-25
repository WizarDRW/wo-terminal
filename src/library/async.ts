export abstract class AsyncContext {
    public static cmd: String = "";
    public abstract request(req): Object;
    public abstract response(res): Object;
}