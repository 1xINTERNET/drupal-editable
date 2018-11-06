interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface Middleware {
  <T>(arg: T): T;
}

export interface MiddlewareActionsOptions {
  [K: string]: Middleware[];
}

export interface MiddlewareHostOptions {
  actions: MiddlewareActionsOptions;
}

export interface MiddlewareHost {
  __middlewares: MiddlewareActionsOptions;
}

export function middlewareHost({ actions }: MiddlewareHostOptions): Function {
  return function(target: Type<any>): MiddlewareHost {
    const proto = target.prototype;

    target.__middlewares = actions;

    return target;
  };
}
