import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { ReactNode } from "react";

const modalRoot = document.getElementById("modal-root");

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal: FunctionComponent<ModalPortalProps> = ({
  children,
}) => {
  return modalRoot ? ReactDOM.createPortal(children, modalRoot) : null;
};
