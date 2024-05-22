import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from "../users/entity/User.entity";
import logger from "./logger";
import { LoggerLevel } from "./types/logger-level.enum";
import { AuthRoles } from "../auth/guards/auth.guard";

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
          if (path.startsWith('users')) {
            return this.usersLog({ method, path, data, body: req.body, user});
          }
        }),
      );
  }

  // Handler for users module
  private usersLog({ method, path, data, body, user }: PathLog) {

    path = path.replace(/^\/?users\/?/g, '');

    switch (method) {
      case 'PATCH':


        if (path.match(/\D*/) && (body.permission !== undefined || body.clan_ids !== undefined)){
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


        if (path.match(/\D*/)){
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

}