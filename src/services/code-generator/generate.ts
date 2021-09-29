import { Definition, DefinitionType, Properties } from "../../types";

const cssPropertyNameMap = {
  marginTop: "marginTop",
  marginRight: "marginRight",
  marginBottom: "marginBottom",
  marginLeft: "marginLeft",
  paddingTop: "paddingTop",
  paddingRight: "paddingRight",
  paddingBottom: "paddingBottom",
  paddingLeft: "paddingLeft",
  width: "width",
  height: "height",
  backgroundColor: "backgroundColor",
  borderRadius: "borderRadius",
  color: "color",
  fontSize: "fontSize",
  letterSpacing: "letterSpacing",
  fontWeight: "fontWeight",
} as {
  [Property in keyof Properties]: string;
};

export const generate = (
  name: string = "NoName",
  definition: Definition | null
) => {
  const jsxTemplate = getJSXTemplate(definition);
  const reactComponentTemplate = getReactComponentTemplate(name, jsxTemplate);

  return reactComponentTemplate;
};

const getJSXTemplate = (definition: Definition | null) => {
  if (!definition) return "null";

  const styleTemplate = getStylesTemplate(definition.properties);
  const childrenTemplate = definition.children.reduce(
    (carry, childDefinition) => {
      return carry + getJSXTemplate(childDefinition);
    },
    ""
  );

  const primitiveTemplate = getPrimitiveTemplate(
    definition.type,
    styleTemplate,
    childrenTemplate
  );

  return primitiveTemplate;
};

const getStylesTemplate = (properties: Properties) => {
  const keys = Object.keys(properties) as Array<keyof typeof properties>;

  if (!keys.length) return "";

  const css = keys.reduce((carry, property) => {
    const value =
      typeof properties[property] === "string"
        ? '"' + properties[property] + '"'
        : properties[property];
    return carry + `${cssPropertyNameMap[property]}: ${value}, `;
  }, "");

  return ` style={{${css}}}`;
};

const getPrimitiveTemplate = (
  type: DefinitionType,
  styleTemplate?: string,
  childrenTemplate?: string
) => {
  switch (type) {
    case "rectangle":
      return getRectangleTemplate(styleTemplate, childrenTemplate);
    case "text":
      return getTextTemplate(styleTemplate);
    default:
      return "";
  }
};

const getRectangleTemplate = (
  styleTemplate: string = "",
  childrenTemplate: string = ""
) => `<div${styleTemplate}>${childrenTemplate}</div>`;

const getTextTemplate = (styleTemplate: string = "") =>
  `<p${styleTemplate}></p>`;

const getReactComponentTemplate = (componentName: string, jsx?: string) =>
  `import React, {FunctionComponent} from "react";const ${componentName}: FunctionComponent = () => ${
    jsx || null
  };export default ${componentName}`;
