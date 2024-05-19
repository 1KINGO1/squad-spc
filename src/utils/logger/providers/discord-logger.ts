import config from "../../../config";
import { BaseLogger } from "./base-logger";


class DiscordLogger extends BaseLogger {

  private token: string;

  constructor() {
    super();

    const token = config.DISCORD_WEBHOOK_URL;

    if (!token) {
      throw new Error("Discord Webhook Logger: URL is not provided");
    }

    console.log("Discord Webhook Logger: Initialized");
    this.token = token;
  }

  log(body): void {}

}

export default DiscordLogger;