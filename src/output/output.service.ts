import { Injectable } from '@nestjs/common';
import { RecordsService } from "../records/records.service";
import { PermissionsService } from "../permissions/permissions.service";

@Injectable()
export class OutputService {
  constructor(private recordsService: RecordsService,
              private permissionsService: PermissionsService
) {}

  async generateOutputByListId(listPath: string) {
    const records = await this.recordsService.getRecordsByListPath(listPath);
    const groups = await this.permissionsService.getGroups();

    let outputString = ``;

    groups.forEach(group => {
      outputString += `Group=${group.name.toLowerCase()}:${group.permissions.map(permission => permission.value).join(',')}\n`;
    });

    outputString += `\n`;

    records.forEach(record => {
      outputString += `Admin=${record.steam_id}:${record.group.name.toLowerCase()} // ${record.clan.tag} ${record.username}\n`;
    })

    return outputString;
  }

}
