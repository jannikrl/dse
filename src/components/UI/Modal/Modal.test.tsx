import { render } from "@testing-library/react";
import { Modal } from "./Modal";

test("renders content in modal", () => {
  const { getByText } = render(<Modal isOpen={true}>Lorem ipsum</Modal>);

  expect(getByText(/Lorem ipsum/i)).toBeInTheDocument();
});

test("renders nothing when isOpen is false", () => {
  const { queryByText } = render(<Modal isOpen={false}>Lorem ipsum</Modal>);

  expect(queryByText(/Lorem ipsum/i)).toBeNull();
});

test("renders renderHeaderSlot", () => {
  const { getByText } = render(
    <Modal isOpen={true} renderHeaderSlot={() => <p>Dolor sit amet</p>}>
      Lorem ipsum
    </Modal>
  );

  expect(getByText(/Lorem ipsum/i)).toBeInTheDocument();
});
