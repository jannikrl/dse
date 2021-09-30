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
    definition.type === "text" ? definition.properties.text : childrenTemplate
  );

  return primitiveTemplate;
};

const getReactComponentTemplate = (componentName: string, jsx?: string) =>
  `import React, {FunctionComponent} from "react";const ${componentName}: FunctionComponent = () => ${
    jsx || null
  };export default ${componentName}`;

const getStylesTemplate = (properties: Properties) => {
  const keys = Object.keys(properties).filter((property) =>
    Object.keys(cssPropertyNameMap).includes(property)
  ) as Array<keyof typeof properties>;

  if (!keys.length) return "";

  const css = keys.reduce((carry, property) => {
    const value =
      typeof properties[property] === "string"
        ? '"' + properties[property] + '"'
        : properties[property];
    if (!cssPropertyNameMap.hasOwnProperty(property)) return carry;
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
      return getTextTemplate(styleTemplate, childrenTemplate);
    case "hStack":
      return getHStackTemplate(styleTemplate, childrenTemplate);
    case "vStack":
      return getVStackTemplate(styleTemplate, childrenTemplate);
    case "icon":
      return getIconTemplate(styleTemplate);
    default:
      return "";
  }
};

const getRectangleTemplate = (
  styleTemplate: string = "",
  childrenTemplate: string = ""
) => `<div${styleTemplate}>${childrenTemplate}</div>`;

const getTextTemplate = (
  styleTemplate: string = "",
  childrenTemplate: string = ""
) => `<p${styleTemplate}>${childrenTemplate}</p>`;

const getHStackTemplate = (
  styleTemplate: string = "",
  childrenTemplate: string = ""
) => `<div${styleTemplate}>${childrenTemplate}</div>`;

const getVStackTemplate = (
  styleTemplate: string = "",
  childrenTemplate: string = ""
) => `<div${styleTemplate}>${childrenTemplate}</div>`;

const getIconTemplate = (styleTemplate: string = "") => `<svg
    ${styleTemplate} 
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="14"
    viewBox="0 0 11 14"
    >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeLinejoin="round"
      strokeWidth="1"
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M5.65 1.967l6.45 9.383H-.8l6.45-9.383z"
        transform="rotate(90 5.65 6.85)"
      ></path>
    </g>
    </svg>`;
