export interface IConfig {
  logger: {
    discord: {
      webhookUrl: string | null
    }
  }
}

const configDefault = {
  logger: {
    discord: {
      webhookUrl: null
    }
  }
}

export default configDefault;