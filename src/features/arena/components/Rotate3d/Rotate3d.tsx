import classNames from "classnames";
import { FunctionComponent, ReactNode } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectIsIn3dMode } from "../../arenaSlice";
import styles from "./Rotate3d.module.css";

interface Rotate3dProps {
  children: ReactNode;
}

export const Rotate3d: FunctionComponent<Rotate3dProps> = ({ children }) => {
  const isIn3dMode = useAppSelector(selectIsIn3dMode);

  return (
    <div
      className={classNames(styles.scene3d, { [styles.active]: isIn3dMode })}
    >
      {children}
    </div>
  );
};
