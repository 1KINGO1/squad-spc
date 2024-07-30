import config from "../../config";
import { BaseLogger } from "./base-logger";
import axios from "axios";
import { LoggerRequestBody } from "../types/logger-request-body.interface";
import { LoggerLevel } from "../types/logger-level.enum";
import { ConfigService } from "../../config/config.service";

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
    this.url = this.configService.get("logger.discord.webhookUrl");
    if (!this.url) {
      return;
    }
    switch (body.level) {
      case LoggerLevel.CREATED:
        return this.logCreated(body);
      case LoggerLevel.UPDATED:
        return this.logUpdated(body);
      case LoggerLevel.DELETED:
        return this.logDeleted(body);
      default:
        throw new Error("Discord Webhook Logger: Invalid log level");
    }

  }

  private async logCreated(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#00a22d",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false }))
    };

    return this.sendToDiscord(message);
  }

  private async logUpdated(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#bb9900",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false }))
    };

    return this.sendToDiscord(message);
  }

  private async logDeleted(body: LoggerRequestBody) {
    const message: DiscordMessageBody = {
      title: body.title || undefined,
      description: body.message || undefined,
      color: "#980000",
      timestamp: new Date(),
      fields: body.fields?.map(field => ({ name: field.name, value: field.value, inline: false }))
    };

    return this.sendToDiscord(message);
  }


  private async sendToDiscord(body: DiscordMessageBody) {
    return axios.post(this.url, {
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
              text: body.footer?.text ? body.footer.text + " © SPC" : "© SPC",
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