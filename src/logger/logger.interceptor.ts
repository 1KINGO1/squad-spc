import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from "../users/entity/User.entity";
import logger from "./logger";
import { LoggerLevel } from "./types/logger-level.enum";
import { AuthRoles } from "../auth/guards/auth.guard";

import { Record } from "../records/entity/Record.entity";

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

}