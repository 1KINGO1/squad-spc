import { BaseLogger } from "./base-logger";
import axios from "axios";
import { LoggerRequestBody } from "../types/logger-request-body.interface";
import { LoggerLevel } from "../types/logger-level.enum";
import { ConfigService } from "../../config/config.service";
import { AuthRoles } from "../../auth/guards/auth.guard";

interface DiscordMessageBody {
  title: string;
  description: string;
  color?: string;
  fields?: {
    name: string;
    value: string;
    inline: boolean;
  }[];
  footer?: {
    text: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  timestamp?: Date;
}

class DiscordLogger extends BaseLogger {

  private url: string;

  constructor(configService: ConfigService) {
    super(configService);
  }

  async log(body: LoggerRequestBody) {
    const isEnabled = this.configService.get("logger.discord.webhook.enabled");
    if (!isEnabled) return;
    this.url = this.configService.get(`logger.discord.webhook.${body.entity}ManagementUrl`);
    if (!this.url) return;

    let message: DiscordMessageBody;

    switch (body.level) {
      case LoggerLevel.CREATED:
        message = await this.serializeCreatedMessage(body);
        break;
      case LoggerLevel.UPDATED:
        message = await this.serializeUpdatedMessage(body);
        break;
      case LoggerLevel.DELETED:
        message = await this.serializeDeletedMessage(body);
        break;
      case LoggerLevel.INFO:
        message = await this.serializeInfoMessage(body);
        break;
      default:
        throw new Error("Discord Webhook Logger: Invalid log level");
    }

    await this.sendToDiscord(message, this.url);
  }

  private async serializeCreatedMessage(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#00a22d",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false })),
      footer: {
        text: body.user ? `${body.user.username} [${AuthRoles[body.user.permission]}] (ID: ${body.user.id})` : undefined,
        icon_url: body.user?.avatar_url ?? undefined
      }
    };

    return message;
  }

  private async serializeInfoMessage(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#198fe3",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false })),
      footer: {
        text: body.user ? `${body.user.username} [${AuthRoles[body.user.permission]}] (ID: ${body.user.id})` : undefined,
        icon_url: body.user?.avatar_url ?? undefined
      }
    };

    return message;
  }

  private async serializeUpdatedMessage(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#bb9900",
      timestamp: new Date(),
      fields: body.fields?.filter(field => field).map(field => ({
        name: field.name,
        value: field.value,
        inline: false
      })),
      footer: {
        text: body.user ? `${body.user.username} [${AuthRoles[body.user.permission]}] (ID: ${body.user.id})` : undefined,
        icon_url: body.user?.avatar_url ?? undefined
      }
    };

    return message;
  }

  private async serializeDeletedMessage(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#980000",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false })),
      footer: {
        text: body.user ? `${body.user.username} [${AuthRoles[body.user.permission]}] (ID: ${body.user.id})` : undefined,
        icon_url: body.user?.avatar_url ?? undefined
      }
    };

    return message;
  }


  private async sendToDiscord(body: DiscordMessageBody, url: string) {
    return axios.post(url, {
        embeds: [
          {
            ...body,
            description: body.description ?
              body.description
                .replaceAll("<b>", "**")
                .replaceAll("<code>", "`")
              : undefined,
            color: parseInt(body.color.replaceAll("#", "0x")) || 0,
            footer: {
              text: body.footer?.text ? body.footer.text.slice(0, 292) + " © SPC" : "© SPC",
              icon_url: body.footer?.icon_url
            }
          }
        ]
      }
    ).catch((e) => {
      console.error("Discord Webhook Logger: Error sending message (Probably incorrect Webhook URL provided)");
    });
  }
}

export default DiscordLogger;
