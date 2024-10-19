import { Purchase } from "../../types/models/Purchase";
import { FC } from "react";
import styles from "./Purchases.module.scss";
import DateCountdown from "../../components/DateCountdown";
import { Button } from "antd";
import classNames from "classnames";
import Copyable from "../../components/Copyable";
import { EditOutlined } from "@ant-design/icons";

interface PurchaseItemProps {
  purchase: Purchase;
}

const PurchaseItem: FC<PurchaseItemProps> = ({ purchase }) => {

  const isExpired = purchase?.expire_date ? Date.now() > new Date(purchase?.expire_date).getTime() : false;

  return (
    <div className={styles.purchaseItemWrapper}>
      <div>

        <div className={styles.purchaseRow}>
          <p className={styles.purchaseProductName}>
            {purchase.product_name}
          </p>
          <span
            className={classNames(styles.purchaseList, !purchase?.list?.name && !isExpired ? styles.warning : undefined)}>
            {purchase?.list?.name ?? "List deleted"}
          </span>
        </div>

        <p className={styles.purchaseProductBuyerName}>{purchase.username} <Copyable text={purchase.steam_id} /></p>

      </div>
      <div className={styles.purchaseTimeLeft}>
        {
          purchase?.expire_date ?
            isExpired ?
              <span>Expired</span> :
              <DateCountdown date={new Date(purchase.expire_date)} /> :
            <span>No expire date</span>
        }
      </div>
      <div className={styles.purchaseLeftSide}>
        {!isExpired ? purchase.isCanceled ? (
          <Button type="primary">
            Activate
          </Button>
        ) : (
          <Button type="primary" danger>
            Deactivate
          </Button>
        ) : null}
        <Button
          icon={<EditOutlined />}
        />
      </div>

    </div>
  );
};

export default PurchaseItem;
