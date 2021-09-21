import { useEffect } from "react";

export const useBackspace = () => {
  let callback: Function = () => {};

  const onBackspace = (cb: Function) => {
    callback = cb;
  };

  const backspaceHandler = (event: any) => {
    if (event.key !== "Backspace") {
      return;
    }
    if (event?.target?.tagName === "INPUT") {
      return;
    }

    callback();
  };

  useEffect(() => {
    document.addEventListener("keydown", backspaceHandler);

    return () => {
      document.removeEventListener("keydown", backspaceHandler);
    };
  });

  return onBackspace;
};
