import { AuthRoles } from "../../auth/guards/auth.guard";

export type ConfigPathType = "string" | "number" | "boolean" | "array<string>";

export interface IConfigPathSettings {
  get: AuthRoles[], // If empty, no one can access
  set: AuthRoles[], // If empty, no one can set
  type: "string" | "number" | "boolean" | "array<string>",
  comment: string,
  name: string
}

export interface IConfigSettings {
  [key: string]: IConfigPathSettings
}

/* IMPORTANT
* IConfigPathSettings must be on one level of depth
*
* FORBIDDEN:
* logger.discord.webhookUrl : {get, set}
* logger.discord.something1.something2: {get, set}
*
* ALLOWED:
* logger.discord.webhookUrl : {get, set}
* logger.discord.something1: {get, set}
* logger.discord.something2: {get, set}
*        ^^^^^^^
*     Same depth level
*
* */

const configSettings: IConfigSettings = {
  "logger.discord.webhook.enabled": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "boolean",
    name: "Enabled",
    comment: "Enable or disable Discord webhook logging",
  },
  "logger.discord.webhook.recordManagementUrl": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "Record Management Webhook URL",
    comment: "Webhook URL for record management logs (record create, record delete)",
  },
  "logger.discord.webhook.clanManagementUrl": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "Clan Management Webhook URL",
    comment: "Webhook URL for clan management logs (create, delete, update, update clan & clan limits)",
  },
  "logger.discord.webhook.permissionManagementUrl": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "Permission Management Webhook URL",
    comment: "Webhook URL for permission management logs (group create, group delete, group edit etc)",
  },
  "logger.discord.webhook.userManagementUrl": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "User Management Webhook URL",
    comment: "Webhook URL for user management logs (user create, user clans update)",
  },
}

export default configSettings;