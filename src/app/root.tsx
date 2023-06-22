import { useEffect, useState } from "react";

import { initializeWasm } from "shared/utils";

import { App } from "./app";

const enum InitializationState {
  Completed = "completed",
  Failed = "failed",
  Pending = "pending",
}

export const Root = () => {
  const [state, setState] = useState<InitializationState>(InitializationState.Pending);

  useEffect(() => {
    (async () =>
      setState(
        (await initializeWasm(`${process.env.PUBLIC_URL}/main.wasm`))
          ? InitializationState.Completed
          : InitializationState.Failed
      ))();
  }, []);

  switch (state) {
    case InitializationState.Completed:
      return <App />;
    case InitializationState.Failed:
      return <p>Initialization error</p>;
    case InitializationState.Pending:
      return <p>Loading...</p>;
    default:
      throw new Error("Unknown state");
  }
};
