import { FunctionComponent, MouseEvent } from "react";
import { ReactNode } from "react";
import { Heading } from "../../typography/Heading/Heading";
import { ModalPortal } from "../ModalPortal/ModalPortal";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  const clickHandler = (event: MouseEvent) => {
    const isClickOnBackdrop = event.target === event.currentTarget;
    if (!isClickOnBackdrop) return;
    onClose?.();
  };

  return (
    (isOpen && (
      <ModalPortal>
        <div
          className={styles.backdrop}
          onClick={clickHandler}
        >
          <div className={styles.modal}>
            {title && (
              <div className={styles.header}>
                <Heading className={styles.title}>{title}</Heading>
              </div>
            )}
            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </ModalPortal>
    )) ||
    null
  );
};
