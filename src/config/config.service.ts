import { BadRequestException, ForbiddenException, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { IConfig } from "./data/config.default";
import configDefault from "./data/config.default";
import { ConfigPathType, IConfigPathSettings, IConfigSettings } from "./data/config.settings";
import { getPropertyByKeyString, setPropertyByKeyString } from "./accessPropertyByKeyString";
import { User } from "../users/entity/User.entity";

@Injectable()
export class ConfigService implements OnModuleInit {

  constructor(
    @Inject("CONFIG_SETTINGS") private readonly configSettings: IConfigSettings,
    @Inject("CONFIG_SAVE_PATH") private readonly configPath: string
  ) {}

  private config: IConfig = null;

  async onModuleInit() {
    await this.parseConfig();
    this.validateConfig();
  }

  private async parseConfig() {
    if (fs.existsSync(this.configPath)) {
      this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    }
    else {
      this.createDefaultConfig();
      await this.saveConfig();
    }
  }
  private createDefaultConfig() {
    this.config = JSON.parse(JSON.stringify(configDefault));
  }
  private async saveConfig() {
    return fsPromises.writeFile(this.configPath, JSON.stringify(this.config, null, 2));
  }
  // Add missing properties
  private validateConfig() {
    if (!this.config) {
      throw new Error('Config is not parsed');
    }

    const settings: IConfigSettings = this.configSettings;
    for (const keyString in settings) {
      try {
        this.getConfigValueByPath(keyString);
      } catch (e) {
        this.setConfigValueByPath(keyString, null);
        this.saveConfig();
      }
    }
  }


  private getConfigPathSettings(keyString: string): IConfigPathSettings | never {
    const settings: IConfigPathSettings | undefined = this.configSettings[keyString];
    if (!settings) {
      throw new BadRequestException(`Config setting path not found: ${keyString}`);
    }
    return settings;
  }
  private getConfigValueByPath(path: string): any {
    if (!this.config) {
      throw new Error('Config is not parsed');
    }

    const property = getPropertyByKeyString(this.config, path);
    if (property === undefined) {
      throw new Error(`Config value not found: ${path}`);
    }

    return property;
  }
  private setConfigValueByPath(path: string, value: any) {
    if (!this.config) {
      throw new Error('Config is not parsed');
    }
    return setPropertyByKeyString(this.config, path, value);
  }
  private verifyConfigPathValueType(type: ConfigPathType, value: any): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number';
      case 'boolean':
        return typeof value === 'boolean';
      case 'array<string>':
        return Array.isArray(value) && value.every(item => typeof item === 'string');
      default:
        throw new Error(`Unknown config type: ${type}`);
    }
  }




  // For in-program use
  get(keyString: string): any {
    return this.getConfigValueByPath(keyString + "");
  }

  // For in-controller use
  getOne(keyString: string, user: User) {
    let settings: IConfigPathSettings;
    try {
      settings = this.getConfigPathSettings(keyString);
    }catch (e) {
      throw new BadRequestException(e.message);
    }

    const {get} = settings;
    if (get.length === 0 || !get.includes(user.permission)) {
      throw new ForbiddenException(`You don't have permission to access this config setting: ${keyString}`);
    }

    let value;
    try {
      value = this.getConfigValueByPath(keyString);
    }catch (e) {
      value = null;
      this.setConfigValueByPath(keyString, value);
      this.saveConfig();
    }

    return value;
  }
  getSome(keyStrings: string[], user: User) {
    const result = {};
    for (const keyString of keyStrings) {
      setPropertyByKeyString(result, keyString, this.getOne(keyString, user));
    }
    return result;
  }
  getAll(user: User) {
    const settings: IConfigSettings = this.configSettings;
    const result = {};
    for (const keyString in settings) {
      try {
        setPropertyByKeyString(result, keyString, this.getOne(keyString, user));
      } catch (e) {
        setPropertyByKeyString(result, keyString, null);
      }
    }
    return result;
  }
  getSettings() {
    const result = {};
    for (const keyString in this.configSettings) {
      const {type, get, set} = this.configSettings[keyString];
      setPropertyByKeyString(result, keyString, {type, get, set});
    }
    return result
  }
  async set(keyString: string, value: any, user: User) {
    let settings: IConfigPathSettings;
    try {
      settings = this.getConfigPathSettings(keyString);
    }catch (e) {
      throw new BadRequestException(e.message);
    }

    const {set, type} = settings;
    if (set.length === 0 || !set.includes(user.permission)) {
      throw new ForbiddenException(`You don't have permission to set this config setting: ${keyString}`);
    }

    if (!this.verifyConfigPathValueType(type, value)) {
      throw new BadRequestException(`Invalid value type for config setting: ${keyString}`);
    }

    this.setConfigValueByPath(keyString, value);
    await this.saveConfig();

    return value;
  }
}
