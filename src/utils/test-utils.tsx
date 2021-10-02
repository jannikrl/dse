import React, { ReactNode, FunctionComponent } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducersMap, RootState } from "../app/store";

interface Options extends RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
}

interface WrapperProps {
  children?: ReactNode;
}

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: reducersMap, preloadedState }),
    ...renderOptions
  }: Options = {}
) {
  const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
