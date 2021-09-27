import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Properties,
  selectSelectedDefinition,
  updateProperty,
} from "../arena/arenaSlice";
import { LabelAndInput } from "./components/LabelAndInput/LabelAndInput";
import { MarginAndPadding } from "./components/MarginAndPadding/MarginAndPadding";
import styles from "./PropertiesPanel.module.css";
import { Section } from "./components/Section/Section";
import { toSentenceCase } from "./utils/toSentenceCase";
import * as yup from "yup";

export const PropertiesPanel = () => {
  const selectedDefinition = useAppSelector(selectSelectedDefinition);
  const properties = selectedDefinition?.properties;
  const excludeList = [
    "marginTop",
    "marginBottom",
    "marginRight",
    "marginLeft",
    "paddingTop",
    "paddingBottom",
    "paddingRight",
    "paddingLeft",
  ];

  let schema = yup.object().shape({
    borderRadius: yup.number().default(0),
    fontSize: yup.number().default(14),
    letterSpacing: yup.number().default(0),
    text: yup.string(),
  });

  const dispatch = useAppDispatch();

  const changeHandler = (
    key: keyof Properties,
    value: string | number | null
  ) => {
    schema.isValid({ [key]: value }).then((valid) => {
      if (!valid) {
        dispatch(updateProperty(schema.pick([key]).getDefault()));
        return;
      }
      dispatch(updateProperty(schema.pick([key]).cast({ [key]: value })));
    });
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
            type={"text"}
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
          <MarginAndPadding
            marginTopValue={properties?.["marginTop"] ?? null}
            marginRightValue={properties?.["marginRight"] ?? null}
            marginBottomValue={properties?.["marginBottom"] ?? null}
            marginLeftValue={properties?.["marginLeft"] ?? null}
            paddingTopValue={properties?.["paddingTop"] ?? null}
            paddingRightValue={properties?.["paddingRight"] ?? null}
            paddingBottomValue={properties?.["paddingBottom"] ?? null}
            paddingLeftValue={properties?.["paddingLeft"] ?? null}
            onMarginTopChange={(value) => changeHandler("marginTop", value)}
            onMarginRightChange={(value) => changeHandler("marginRight", value)}
            onMarginBottomChange={(value) =>
              changeHandler("marginBottom", value)
            }
            onMarginLeftChange={(value) => changeHandler("marginLeft", value)}
            onPaddingTopChange={(value) => changeHandler("paddingTop", value)}
            onPaddingRightChange={(value) =>
              changeHandler("paddingRight", value)
            }
            onPaddingBottomChange={(value) =>
              changeHandler("paddingBottom", value)
            }
            onPaddingLeftChange={(value) => changeHandler("paddingLeft", value)}
            disablePadding={["text", "icon"].includes(selectedDefinition.type)}
          />
        )}

        {renderProperties()}
      </Section>
    </div>
  );
};
