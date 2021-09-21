import { useEffect } from "react";

export const useAlt = () => {
  let keyDCallback: Function = () => {};
  let keyUCallback: Function = () => {};

  const onAlt = (
    keyDownCallback: Function,
    keyUpCallBack: Function = () => {}
  ) => {
    keyDCallback = keyDownCallback;
    keyUCallback = keyUpCallBack;
  };

  const keyDownHandler = (event: any) => {
    if (event.key !== "Alt") {
      return;
    }

    keyDCallback();
  };

  const keyUpHandler = (event: any) => {
    if (event.key !== "Alt") {
      return;
    }

    keyUCallback();
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  });

  return onAlt;
};
