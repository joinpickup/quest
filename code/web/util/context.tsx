import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export type ContextStateDispatcher<S> = {
  state: S;
  setState: Dispatcher<S>;
};
