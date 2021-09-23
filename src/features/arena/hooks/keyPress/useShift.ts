import { useEffect } from "react";

export const useShift = () => {
  let keyDCallback: Function = () => {};
  let keyUCallback: Function = () => {};

  const onShift = (
    keyDownCallback: Function,
    keyUpCallBack: Function = () => {}
  ) => {
    keyDCallback = keyDownCallback;
    keyUCallback = keyUpCallBack;
  };

  const keyDownHandler = (event: any) => {
    if (event.key !== "Shift") {
      return;
    }

    keyDCallback();
  };

  const keyUpHandler = (event: any) => {
    if (event.key !== "Shift") {
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

  return onShift;
};
