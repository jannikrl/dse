import { useEffect } from "react";

export const useEscape = () => {
  let callback: Function = () => {};

  const onEscape = (cb: Function) => {
    callback = cb;
  };

  const escapeHandler = (event: any) => {
    if (event.key !== "Escape") {
      return;
    }

    callback();
    event?.target?.blur();
  };

  useEffect(() => {
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  });

  return onEscape;
};
