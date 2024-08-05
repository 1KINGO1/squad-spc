import { Roles } from "../Roles";

export interface IConfigPathSettings {
  get: Roles[], // If empty, no one can access
  set: Roles[], // If empty, no one can set
  type: "string" | "number" | "boolean" | "array<string>",
  name: string,
  comment: string
}

export interface ConfigPath {
  [key: string]: ConfigPath | IConfigPathSettings
}

export interface ConfigSettings {
  [key: string]: ConfigPath
}