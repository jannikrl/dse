import { FunctionComponent } from "react";
import { Input } from "../Input/Input";
import styles from "./LabelAndInput.module.css";

interface LabelAndInputProps {
  label: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  type: "text" | "number"
}

export const LabelAndInput: FunctionComponent<LabelAndInputProps> = ({
  label,
  value,
  onChange,
  type,
}) => (
  <div className={styles.root}>
    <label className={styles.label}>{label}</label>
    <Input className={styles.input} value={value} type={type} onChange={onChange} />
  </div>
);
