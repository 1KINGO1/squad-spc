import { AuthRoles } from "../../auth/guards/auth.guard";

export type ConfigPathType = "string" | "number" | "boolean" | "array<string>";

export interface IConfigPathSettings {
  get: AuthRoles[], // If empty, no one can access
  set: AuthRoles[], // If empty, no one can set
  type: "string" | "number" | "boolean" | "array<string>",
  comment: string,
  name: string,
  default?: string | number | boolean | string[],
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

const All = [AuthRoles.Root, AuthRoles.Guest, AuthRoles.ClanLeader, AuthRoles.Admin];

const configSettings: IConfigSettings = {
  "general.visual.projectName": {
    get: All,
    set: [AuthRoles.Root],
    type: "string",
    name: "Project name",
    comment: "Project name displayed in the header",
  },
  "general.visual.projectAvatarUrl": {
    get: All,
    set: [AuthRoles.Root],
    type: "string",
    name: "Project avatar URL",
    comment: "Project avatar displayed in the header",
  },
  "logger.discord.webhook.enabled": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "boolean",
    name: "Enabled",
    default: false,
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
  "logger.discord.webhook.listManagementUrl": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "List Management Webhook URL",
    comment: "Webhook URL for list management logs (create, delete, update)",
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
  "payment.general.enabled": {
    get: All,
    set: [AuthRoles.Root],
    type: "boolean",
    name: "Enabled",
    default: false,
    comment: "Enable or disable payments (paid roles etc)",
  },
  "payment.stripe.enabled": {
    get: All,
    set: [AuthRoles.Root],
    type: "boolean",
    name: "Enabled",
    default: false,
    comment: "Enable or disable Stripe payments & Paid subscriptions (Allow users to funds balance) [Has no effect if payment.general.enabled is disabled] [RESTART REQUIRED]",
  },
  "payment.stripe.publicKey": {
    get: All,
    set: [AuthRoles.Root],
    type: "string",
    name: "Public Key",
    comment: "Stripe public key (RESTART REQUIRED)",
  },
  "payment.stripe.privateKey": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "Private Key",
    comment: "Stripe private key (RESTART REQUIRED)",
  },
  "payment.stripe.currency": {
    get: All,
    set: [AuthRoles.Root],
    type: "string",
    name: "Currency",
    comment: "Stripe currency (See https://docs.stripe.com/currencies) (RESTART REQUIRED)",
  },
  "payment.stripe.webhookSecret": {
    get: [AuthRoles.Root],
    set: [AuthRoles.Root],
    type: "string",
    name: "Webhook Secret",
    comment: "Stripe webhook secret (RESTART REQUIRED)",
  },
  "payment.stripe.minimumBalance": {
    get: All,
    set: [AuthRoles.Root],
    type: "number",
    name: "Minimum balance add amount",
    comment: "Stripe may require a minimum amount to add funds (stripe minimum - 0.5$, convert it into your currency and paste here)",
    default: 25,
  },
  "payment.stripe.maximumBalance": {
    get: All,
    set: [AuthRoles.Root],
    type: "number",
    name: "Maximum balance add amount",
    comment: "Stripe may require a max amount to add funds (stripe maximum - 999999$)",
    default: 10000,
  },
}

export default configSettings;