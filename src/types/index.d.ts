export type Id = number;

export interface Definition {
  type: DefinitionType;
  id: Id;
  properties: Properties;
  children: Definition[];
}

export type DefinitionType =
  | "rectangle"
  | "text"
  | "hStack"
  | "vStack"
  | "icon";

export interface Properties {
  minWidth?: number;
  minHeight?: number;
  backgroundColor?: string;
  borderRadius?: number;
  text?: string;
  color?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}
