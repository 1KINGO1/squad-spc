import { FC } from "react";
import DateCountdown from "./DateCountdown";

interface Purchase {
  expire_date: Date  | number | null;
  isCanceled: boolean;
  cancel_date: Date | null;
}

const PurchaseDateCountdown: FC<{purchase: Purchase, frozen?: boolean}> = ({purchase, frozen}) => {
  console.log(purchase.expire_date);
  let isExpired = purchase?.expire_date ? Date.now() > new Date(purchase?.expire_date).getTime() : false;
  isExpired = isExpired && !purchase.isCanceled;

  let purchaseTimeleft;
  if (purchase.expire_date) {
    if (purchase.isCanceled) purchaseTimeleft =
      (<span>
        <DateCountdown date={new Date(Date.now() + new Date(purchase.expire_date).getTime() - new Date(purchase.cancel_date!).getTime())} frozen/> Deactivated
    </span>);
  else if (isExpired) purchaseTimeleft = (<span>Expired</span>);
    else purchaseTimeleft = <DateCountdown date={new Date(purchase.expire_date)} frozen={frozen}/>;
  } else {
    purchaseTimeleft = (<span>No expiration date</span>)
  }

  return purchaseTimeleft;
}

export default PurchaseDateCountdown;
