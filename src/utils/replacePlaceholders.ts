import { User } from "../users/entity/User.entity";
import { Purchase } from "../purchases/entity/Purchase.entity";

interface ReplacePlaceholdersOptions {
  user?: User;
  balanceTopUpAmount?: number;
  purchase?: Purchase;
  currency?: string;
}

function replacePlaceholders(body: string, options: ReplacePlaceholdersOptions) {
  return body
    .replaceAll(/{{\s*user.steam_id\s*}}/g, options?.user?.steam_id ?? "null")
    .replaceAll(/{{\s*user.name\s*}}/g, options?.user?.username ?? "null")
    .replaceAll(/{{\s*user.id\s*}}/g, (options?.user?.id ?? "null") + "")
    .replaceAll(/{{\s*balance.top_up_amount\s*}}/g, (options?.balanceTopUpAmount ?? "null") + "")
    .replaceAll(/{{\s*purchase.id\s*}}/g, (options?.purchase?.id ?? "null") + "")
    .replaceAll(/{{\s*purchase.product_name\s*}}/g, options?.purchase?.product_name ?? "null")
    .replaceAll(/{{\s*purchase.money_spent\s*}}/g, (options?.purchase?.purchase_price ?? "null") + "")
    .replaceAll(/{{\s*currency\s*}}/g, options.currency ?? "null")
}

export default replacePlaceholders;
