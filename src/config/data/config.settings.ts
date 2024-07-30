import { AuthRoles } from "../../auth/guards/auth.guard";

export type ConfigPathType = "string" | "number" | "boolean" | "array<string>";

export interface IConfigPathSettings {
  get: AuthRoles[], // If empty, no one can access
  set: AuthRoles[], // If empty, no one can set
  type: "string" | "number" | "boolean" | "array<string>",
}

export interface IConfigSettings {
  [key: string]: IConfigPathSettings
}

const configSettings: IConfigSettings = {
  "logger.discord.webhookUrl": {
    get: [AuthRoles.Root], // TODO: If empty, everyone can access
    set: [AuthRoles.Root], // TODO: If empty, only root can set
    type: "string",
  },
}

export default configSettings;