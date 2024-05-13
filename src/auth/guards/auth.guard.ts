import { CanActivate, ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { User } from "../../users/entity/User.entity";

export enum AuthRoles {
  Guest = 0,
  ClanLeader = 1,
  Admin = 2,
  Root = 3
}

function AuthGuard(permission_levels: AuthRoles[] = [AuthRoles.Guest]) {
  @Injectable()
  class Guard implements CanActivate {
    async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();

      if (!req?.user) return false;

      if (!permission_levels.includes((req.user as User).permission)) return false;

      return true;
    }
  }

  return Guard;
}

export const Auth = (permission_level?: AuthRoles[]) => UseGuards(AuthGuard(permission_level));