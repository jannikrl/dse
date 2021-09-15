import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Properties,
  selectSelectedDefinition,
  updateProperty,
} from "../arena/arenaSlice";
import { LabelAndInput } from "./LabelAndInput/LabelAndInput";
import styles from "./PropertiesPanel.module.css";
import { Section } from "./Section/Section";
import { toSentenceCase } from "./utils/toSentenceCase";

export const PropertiesPanel = () => {
  const selectedDefinition = useAppSelector(selectSelectedDefinition);

  const dispatch = useAppDispatch();

  const changeHandler = (key: keyof Properties, value: string | number) => {
    dispatch(updateProperty({ [key]: value }));
  };

  const renderProperties = () => {
    const properties = selectedDefinition?.properties;
    if (!properties) return null;
    const keys = Object.keys(properties) as [keyof Properties];

    return keys.map((key) => {
      const isNumber = typeof properties[key] === "number";
      const type = isNumber ? "number" : "text";
      return (
        <LabelAndInput
          label={toSentenceCase(key)}
          key={key}
          value={properties[key]}
          onChange={(value) => changeHandler(key, value)}
          type={type}
        />
      );
    });
  };

  return (
    <div
      className={classNames(styles.root, {
        [styles.placeholder]: selectedDefinition === null,
      })}
    >
      <Section title="Layout">{renderProperties()}</Section>
    </div>
  );
};
