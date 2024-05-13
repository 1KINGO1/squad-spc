import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions/permissions.service";
import { ClansService } from "../clans/clans.service";
import { ListsService } from "../lists/lists.service";

@Injectable()
export class DatabaseSeedService {

  constructor(
    private permissionsService: PermissionsService,
    private clansService: ClansService,
    private listsService: ListsService
  ) {}

  async seed() {
    // Permissions init
    await this.permissionsService.createPermission({ name: "ChangeMap", value: "changemap" });
    const kick = await this.permissionsService.createPermission({ name: "Kick", value: "kick" });
    const ban = await this.permissionsService.createPermission({ name: "Ban", value: "ban" });
    const adminChat = await this.permissionsService.createPermission({ name: "CanSeeAdminChat", value: "canseeadminchat" });
    const balance = await this.permissionsService.createPermission({ name: "Balance", value: "balance" });
    await this.permissionsService.createPermission({ name: "Pause", value: "pause" });
    await this.permissionsService.createPermission({ name: "Cheat", value: "cheat" });
    await this.permissionsService.createPermission({ name: "Private", value: "private" });
    const chat = await this.permissionsService.createPermission({ name: "Chat", value: "chat" });
    await this.permissionsService.createPermission({ name: "Config", value: "config" });
    await this.permissionsService.createPermission({ name: "Immune", value: "immune" });
    await this.permissionsService.createPermission({ name: "ManageServer", value: "manageserver" });
    const camera = await this.permissionsService.createPermission({ name: "Camera", value: "cameraman" });
    await this.permissionsService.createPermission({ name: "FeatureTest", value: "featuretest" });
    const forceTeamChange = await this.permissionsService.createPermission({ name: "ForceTeamChange", value: "forceteamchange" });
    const reserve = await this.permissionsService.createPermission({ name: "Reserve", value: "reserve" });
    await this.permissionsService.createPermission({ name: "Demos", value: "demos" });
    await this.permissionsService.createPermission({ name: "Debug", value: "debug" });
    const teamChange = await this.permissionsService.createPermission({ name: "TeamChange", value: "teamchange" });

    // Groups init
    const whitelistGroup = await this.permissionsService.createGroup({ name: "Whitelist", permissions: [reserve.id] });
    const adminGroup = await this.permissionsService.createGroup(
      {
        name: "Admin",
        permissions: [reserve.id, teamChange.id, balance.id, kick.id, ban.id, adminChat.id, chat.id, camera.id, forceTeamChange.id]
      }
    );

    // List init
    const list = await this.listsService.create({ name: "Main", path: "main" });

    // Clans init
    await this.clansService.createClan({ name: "Admins", tag: "[ADM]", allowed_lists: [list.id]});
    await this.clansService.createClan({ name: "Whitelists", tag: "[WHT]", allowed_lists: [list.id]});



  }
}
