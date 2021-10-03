import * as React from "react";
import { render } from "../../utils/test-utils";
import { LayersPanel } from "./LayersPanel";
import { initialState } from "../arena/arenaSlice";
import userEvent from "@testing-library/user-event";
import { Definition } from "../../types";

describe("LayersPanel component test", () => {
  const definition = {
    type: "rectangle",
    id: 1,
    properties: {},
    children: [],
  } as Definition;

  test("it should render a border when item is selected", () => {
    const { getByText } = render(<LayersPanel />, {
      preloadedState: {
        arena: {
          ...initialState,
          definition,
          selectedId: 1,
        },
      },
    });

    expect(getByText(/rectangle/i).parentElement).toHaveStyle(
      `border: 1px solid`
    );
  });

  test("it should not render a border when item is unselected", () => {
    const { getByText } = render(<LayersPanel />, {
      preloadedState: {
        arena: {
          ...initialState,
          definition,
          selectedId: null,
        },
      },
    });

    expect(getByText(/rectangle/i).parentElement).not.toHaveStyle(
      `border: 1px solid`
    );
  });

  test("it should render a border when item is clicked", () => {
    const { getByText } = render(<LayersPanel />, {
      preloadedState: {
        arena: {
          ...initialState,
          definition,
        },
      },
    });

    const listItemElement = getByText(/rectangle/i);

    userEvent.click(listItemElement);

    expect(listItemElement.parentElement).toHaveStyle(`border: 1px solid`);
  });
});
