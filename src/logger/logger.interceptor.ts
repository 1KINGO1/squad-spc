import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from "../users/entity/User.entity";
import logger from "./logger";
import { LoggerLevel } from "./types/logger-level.enum";
import { AuthRoles } from "../auth/guards/auth.guard";

import { Record } from "../records/entity/Record.entity";
import { Group } from "../permissions/entity/Group.entity";
import { List } from "../lists/entity/List.entity";

interface PathLog{
  method: string;
  path: string;
  data: any;
  body: any;
  user: User
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest() as Request & { user: User };
    const path = req.url.replace(/^\/?api\/?/g, '').replace(/^\//g, '');
    const method = req.method;
    const user = req.user;

    return next
      .handle()
      .pipe(
        tap((data) => {

          const logData = { method, path, data, body: req.body, user };

          if (path.startsWith('users')) {
            return this.usersLog(logData);
          }
          if (path.startsWith('records')) {
            return this.recordsLog(logData);
          }
          if (path.startsWith('permissions')) {
            return this.permissionsLog(logData);
          }
          if (path.startsWith('lists')) {
            return this.listsLog(logData);
          }
        }),
      );
  }

  // Handler for users module
  private usersLog({ method, path, data, body, user }: PathLog) {

    path = path.replace(/^\/?users\/?/g, '');

    switch (method) {
      case 'PATCH':


        if (path.match(/\d*/) && (body.permission !== undefined || body.clan_ids !== undefined)){
          return logger.log({
            level: LoggerLevel.UPDATED,
            message: `Updated user <b>${data.username}<b> <code>${data.steam_id}<code>
By <b>${user.username}<b> <code>${user.steam_id}<code>
${body.permission !== undefined ? `Permission: ${AuthRoles[body.permission]} -> <b>${AuthRoles[data.permission]}<b>\n` : ''}${body.clan_ids !== undefined ? `Clan ID's: <b>${body.clan_ids.join(',')}<b>` : ''}`,
            title: 'User updated',
          })
        }


        break;
      case 'DELETE':


        if (path.match(/\d*/)){
          logger.log({
            level: LoggerLevel.DELETED,
            title: 'User deleted',
            image_url: data.avatar_url,
            message: `Deleted user <b>${data.username}<b> <code>${data.steam_id}<code>\nBy <b>${user.username}<b> <code>${user.steam_id}<code>`,
          });
        }


        break;
      default:
        break;
    }
  }
  // Handler for records module
  private recordsLog({ method, path, data, body, user }: PathLog) {

      path = path.replace(/^\/?records\/?/g, '');

      const responseData = data as Record;

      switch (method) {
        case 'POST':
          if (path.match(/clan\/\d+\/list\/\d+/)){
            return logger.log({
              level: LoggerLevel.CREATED,
              title: 'Record created',
              fields: [
                {
                  name: 'Record ID',
                  value: responseData.id + '',
                },
                {
                  name: 'Username',
                  value: responseData.username,
                },
                {
                  name: 'Steam ID',
                  value: responseData.steam_id,
                },
                {
                  name: 'Clan',
                  value: responseData.clan.name + ` ID: ${responseData.clan.id}`,
                },
                {
                  name: 'Group',
                  value: responseData.group.name,
                },
                {
                  name: 'List',
                  value: responseData.list.name,
                },
                {
                  name: 'Expires at',
                  value: responseData.expire_date ? `<t:${Math.round(responseData.expire_date.getTime() / 1000)}:R>` : 'Never',
                },
                {
                  name: 'Created by',
                  value: user.username + ` (${AuthRoles[user.permission]})`,
                }
              ]
            })
          }
          break;

        case 'DELETE':
          if (path.match(/\d+/)){
            return logger.log({
              level: LoggerLevel.DELETED,
              title: 'Record deleted',
              fields: [
                {
                  name: 'Record ID',
                  value: responseData.id + '',
                },
                {
                  name: 'Username',
                  value: responseData.username,
                },
                {
                  name: 'Steam ID',
                  value: responseData.steam_id,
                },
                {
                  name: 'Clan',
                  value: responseData.clan.name + ` ID: ${responseData.clan.id}`,
                },
                {
                  name: 'Removed by',
                  value: user.username + ` (${AuthRoles[user.permission]})`,
                }
              ]
            })
          }
          break;

        default:
          break
      }
  }
  // Handler for permissions module
  private permissionsLog({ method, path, data, body, user }: PathLog) {
    path = path.replace(/^\/?permissions\/?/g, '');

    let responseData = data as Group;

    switch (method) {
      case 'POST':
        if (path.match(/^groups/)){
          return logger.log({
            level: LoggerLevel.CREATED,
            title: 'Group created',
            fields: [
              {
                name: 'Group ID',
                value: responseData.id + '',
              },
              {
                name: 'Name',
                value: responseData.name,
              },
              {
                name: 'Permissions',
                value: responseData.permissions.map(p => p.name).join(', '),
              },
              {
                name: 'Created by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      case 'PATCH':
        if (path.match(/^groups\/\d+/)){
          return logger.log({
            level: LoggerLevel.UPDATED,
            title: 'Group updated',
            fields: [
              {
                name: 'Group ID',
                value: responseData.id + '',
              },
              {
                name: 'Name' + (body.name ? ' (updated)' : ''),
                value: responseData.name,
              },
              {
                name: 'Permissions' + (body.permissions ? ' (updated)' : ''),
                value: responseData.permissions.map(p => p.name).join(', '),
              },
              {
                name: 'Updated by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      case 'DELETE':
        if (path.match(/^groups\/\d+/)){
          return logger.log({
            level: LoggerLevel.DELETED,
            title: 'Group deleted',
            fields: [
              {
                name: 'Group ID',
                value: responseData.id + '',
              },
              {
                name: 'Name' + (body.name ? ' (updated)' : ''),
                value: responseData.name,
              },
              {
                name: 'Deleted by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      default:
        break;
    }
  }
  // Handler for lists module
  private listsLog({ method, path, data, body, user }: PathLog) {
    path = path.replace(/^\/?lists\/?/g, '');

    let responseData = data as List;

    switch (method) {
      case 'POST':
        if (path.match(/^/)){
          return logger.log({
            level: LoggerLevel.CREATED,
            title: 'List created',
            fields: [
              {
                name: 'List ID',
                value: responseData.id + '',
              },
              {
                name: 'Name',
                value: responseData.name,
              },
              {
                name: 'Path',
                value: responseData.path,
              },
              {
                name: 'Created by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      case 'PATCH':
        if (path.match(/^\d+/)){
          return logger.log({
            level: LoggerLevel.UPDATED,
            title: 'List updated',
            fields: [
              {
                name: 'List ID',
                value: responseData.id + '',
              },
              {
                name: 'Name' + (body.name ? ' (updated)' : ''),
                value: responseData.name,
              },
              {
                name: 'Path' + (body.path ? ' (updated)' : ''),
                value: responseData.path,
              },
              {
                name: 'Updated by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      case 'DELETE':
        if (path.match(/^\d+/)){
          return logger.log({
            level: LoggerLevel.DELETED,
            title: 'List deleted',
            fields: [
              {
                name: 'List ID',
                value: responseData.id + '',
              },
              {
                name: 'Name',
                value: responseData.name,
              },
              {
                name: 'Path',
                value: responseData.path,
              },
              {
                name: 'Deleted by',
                value: user.username + ` (${AuthRoles[user.permission]})`,
              }
            ]
          })
        }
        break;
      default:
        break;
    }
  }


}