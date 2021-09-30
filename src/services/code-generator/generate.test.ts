import { generate } from "./generate";
import { Definition } from "../../types";

describe("Generate", () => {
  test("Outputs null if no definition", () => {
    expect(generate("AName", null)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => null;export default AName`
    );
  });

  test("Outputs a div for a rectangle", () => {
    const input = {
      id: 0,
      type: "rectangle",
      properties: {},
      children: [],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div></div>;export default AName`
    );
  });

  test("Outputs a p for a text", () => {
    const input = {
      id: 0,
      type: "text",
      properties: {},
      children: [],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <p></p>;export default AName`
    );
  });

  test("Outputs a div for a hStack", () => {
    const input = {
      id: 0,
      type: "hStack",
      properties: {},
      children: [],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div></div>;export default AName`
    );
  });

  test("Outputs a div for a vStack", () => {
    const input = {
      id: 0,
      type: "vStack",
      properties: {},
      children: [],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div></div>;export default AName`
    );
  });

  test("Outputs styles for a rectangle", () => {
    const input = {
      id: 0,
      type: "rectangle",
      children: [],
      properties: {
        width: 48,
        height: 48,
        backgroundColor: "#ccc",
      },
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div style={{width: 48, height: 48, backgroundColor: "#ccc", }}></div>;export default AName`
    );
  });

  test("Outputs styles for a text", () => {
    const input = {
      id: 0,
      type: "text",
      children: [],
      properties: {
        marginRight: 48,
        marginLeft: 48,
      },
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <p style={{marginRight: 48, marginLeft: 48, }}></p>;export default AName`
    );
  });

  test("Outputs styles for a hStack", () => {
    const input = {
      id: 0,
      type: "hStack",
      children: [],
      properties: {
        marginRight: 48,
        marginLeft: 48,
      },
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div style={{marginRight: 48, marginLeft: 48, }}></div>;export default AName`
    );
  });

  test("Outputs styles for a vStack", () => {
    const input = {
      id: 0,
      type: "vStack",
      children: [],
      properties: {
        marginRight: 48,
        marginLeft: 48,
      },
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div style={{marginRight: 48, marginLeft: 48, }}></div>;export default AName`
    );
  });

  test("Outputs all styles for a rectangle", () => {
    const input = {
      id: 0,
      type: "rectangle",
      children: [],
      properties: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        width: 0,
        height: 0,
        backgroundColor: "#ccc",
        borderRadius: 0,
      },
    } as Definition;

    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div style={{marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, width: 0, height: 0, backgroundColor: "#ccc", borderRadius: 0, }}></div>;export default AName`
    );
  });

  test("Outputs all styles for a text", () => {
    const input = {
      id: 0,
      type: "text",
      children: [],
      properties: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        color: "#000000",
        fontSize: 0,
        letterSpacing: 0,
        fontWeight: 400,
      },
    } as Definition;

    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <p style={{marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, color: "#000000", fontSize: 0, letterSpacing: 0, fontWeight: 400, }}></p>;export default AName`
    );
  });

  test("Outputs a div within a div for a nested rectangle", () => {
    const input = {
      id: 0,
      type: "rectangle",
      properties: {},
      children: [
        {
          id: 1,
          type: "rectangle",
          properties: {},
          children: [],
        },
      ],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div><div></div></div>;export default AName`
    );
  });

  test("Outputs a div within a div for a nested hStacks", () => {
    const input = {
      id: 0,
      type: "hStack",
      properties: {},
      children: [
        {
          id: 1,
          type: "hStack",
          properties: {},
          children: [],
        },
      ],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div><div></div></div>;export default AName`
    );
  });

  test("Outputs a div within a div for a nested vStacks", () => {
    const input = {
      id: 0,
      type: "vStack",
      properties: {},
      children: [
        {
          id: 1,
          type: "vStack",
          properties: {},
          children: [],
        },
      ],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div><div></div></div>;export default AName`
    );
  });

  test("Outputs a p within a div for a text inside a rectangle", () => {
    const input = {
      id: 0,
      type: "rectangle",
      properties: {},
      children: [
        {
          id: 1,
          type: "text",
          properties: {},
          children: [],
        },
      ],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <div><p></p></div>;export default AName`
    );
  });

  test("Outputs a p with text inside", () => {
    const input = {
      id: 0,
      type: "text",
      properties: {
        text: "Type something",
      },
      children: [],
    } as Definition;
    expect(generate("AName", input)).toEqual(
      `import React, {FunctionComponent} from "react";const AName: FunctionComponent = () => <p>Type something</p>;export default AName`
    );
  });
});
