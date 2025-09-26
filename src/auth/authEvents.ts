type Handler = () => void;

let unauthHandlers: Handler[] = [];

export const onUnauthenticated = (handler: Handler) => {
  unauthHandlers.push(handler);
  return () => {
    unauthHandlers = unauthHandlers.filter((h) => h !== handler);
  };
};

export const emitUnauthenticated = () => {
  for (const h of unauthHandlers) h();
};

