import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Properties,
  selectSelectedDefinition,
  updateProperty,
} from "../arena/arenaSlice";
import { LabelAndInput } from "./LabelAndInput/LabelAndInput";
import { Margin } from "./Margin/Margin";
import styles from "./PropertiesPanel.module.css";
import { Section } from "./Section/Section";
import { toSentenceCase } from "./utils/toSentenceCase";

export const PropertiesPanel = () => {
  const selectedDefinition = useAppSelector(selectSelectedDefinition);
  const properties = selectedDefinition?.properties;
  const excludeList = [
    "marginTop",
    "marginBottom",
    "marginRight",
    "marginLeft",
  ];

  const dispatch = useAppDispatch();

  const changeHandler = (
    key: keyof Properties,
    value: string | number | null
  ) => {
    dispatch(updateProperty({ [key]: value }));
  };

  const renderProperties = () => {
    if (!properties) return null;
    const keys = Object.keys(properties) as [keyof Properties];

    return keys
      .filter((key) => !excludeList.includes(key))
      .map((key) => {
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
      <Section title="Layout">
        {selectedDefinition && (
          <Margin
            marginTopValue={properties?.["marginTop"] ?? null}
            marginRightValue={properties?.["marginRight"] ?? null}
            marginBottomValue={properties?.["marginBottom"] ?? null}
            marginLeftValue={properties?.["marginLeft"] ?? null}
            onMarginTopChange={(value) => changeHandler("marginTop", value)}
            onMarginRightChange={(value) => changeHandler("marginRight", value)}
            onMarginBottomChange={(value) => changeHandler("marginBottom", value)}
            onMarginLeftChange={(value) => changeHandler("marginLeft", value)}
          />
        )}

        {renderProperties()}
      </Section>
    </div>
  );
};
