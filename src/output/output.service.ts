import { Injectable } from '@nestjs/common';
import { RecordsService } from "../records/records.service";
import { PermissionsService } from "../permissions/permissions.service";
import { PurchasesService } from "../purchases/purchases.service";
import * as crypto from 'crypto';

@Injectable()
export class OutputService {
  constructor(private recordsService: RecordsService,
              private permissionsService: PermissionsService,
              private purchaseService: PurchasesService
) {}

  async generateOutputByListId(listPath: string) {
    const records = await this.recordsService.getRecordsByListPath(listPath);
    const groups = await this.permissionsService.getGroups();
    const purchases = await this.purchaseService.getActivePurchasesByListPath(listPath);

    let outputString = ``;

    groups.forEach(group => {
      outputString += `Group=${group.name.toLowerCase()}:${group.permissions.map(permission => permission.value).join(',')}\n`;
    });

    outputString += `\n`;

    records.forEach(record => {
      outputString += `Admin=${record.steam_id}:${record.group.name.toLowerCase()} // ${record.clan.tag} ${record.username}\n`;
    })

    outputString += `\n`;

    const purchaseHash = crypto.randomBytes(10).toString('hex');

    purchases.forEach((purchase, index) => {
      const groupHash = purchaseHash + index;

      outputString += `Group=${groupHash}:${purchase.permissions}\n`;
      outputString += `Admin=${purchase.steam_id}:${groupHash} // Product: ${purchase.product_name} | Name:  ${purchase.username}\n`;
    });


    return outputString;
  }

}
