import * as React from "react";
import { render } from "../../utils/test-utils";
import { PropertiesPanel } from "./PropertiesPanel";
import { initialState } from "../arena/arenaSlice";

describe("PropertiesPanel component test", () => {
  test("it should not render the margin and padding component, when nothing is selected", () => {
    const { queryByText } = render(<PropertiesPanel />);
    
    expect(queryByText(/Margin & Padding/i)).toBeNull();
  });

  test("it should render the margin and padding component, when something is selected", () => {
    const { getByText } = render(<PropertiesPanel />, {
      preloadedState: {
        arena: {
          ...initialState,
          definition: {
            type: "rectangle",
            id: 1,
            properties: {},
            children: [],
          },
          selectedId: 1,
        },
      },
    });

    expect(getByText(/Margin & Padding/i)).toBeInTheDocument();
  });
});
