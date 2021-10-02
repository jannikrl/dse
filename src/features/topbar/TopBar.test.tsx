import * as React from "react";
import { render } from "../../utils/test-utils";

import { Topbar } from "./Topbar";

describe("TopBar component test", () => {
  test("it should render the rectangle button", () => {
    const { getByText } = render(<Topbar />);

    expect(getByText(/rectangle/i)).toBeInTheDocument();
  });
});
