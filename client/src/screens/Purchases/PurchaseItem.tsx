import { Purchase } from "../../types/models/Purchase";
import { FC, useState } from "react";
import styles from "./Purchases.module.scss";
import DateCountdown from "../../components/DateCountdown";
import { Button, message } from "antd";
import classNames from "classnames";
import Copyable from "../../components/Copyable";
import { EditOutlined } from "@ant-design/icons";
import useDeactivatePurchase from "../../hooks/purchases/useDeactivatePurchase";
import { GetAllPurchasesParams } from "../../services/purchases.service";
import useActivatePurchase from "../../hooks/purchases/useActivatePurchase";
import EditPurchaseModal from "./modals/EditPurchaseModal";
import PurchaseDateCountdown from "../../components/PurchaseDateCountdown";
import useProducts from "../../hooks/products/useProducts";

interface PurchaseItemProps {
  purchase: Purchase;
  params: GetAllPurchasesParams;
}

const PurchaseItem: FC<PurchaseItemProps> = ({ purchase, params }) => {
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: deactivate } = useDeactivatePurchase({
    params,
    onSuccess: () => {
      setLoading(false);
    },
    onError: (errorMessage) => {
      setLoading(false);
      message.error(errorMessage);
    }
  });

  const { mutate: activate } = useActivatePurchase({
    params,
    onSuccess: () => {
      setLoading(false);
    },
    onError: (errorMessage) => {
      setLoading(false);
      message.error(errorMessage);
    }
  });

  const { data: products } = useProducts();

  const deactivateHandler = () => {
    setLoading(true);
    deactivate(purchase.id);
  };

  const activateHandler = () => {
    setLoading(true);
    activate(purchase.id);
  };

  let isExpired = purchase?.expire_date ? Date.now() > new Date(purchase?.expire_date).getTime() : false;
  isExpired = isExpired && !purchase.isCanceled;

  const purchaseStatus = !isExpired ? purchase.isCanceled ?
      <span style={{ color: "var(--color-red)" }}>Deactivated</span> :
      <span style={{ color: "var(--color-green)" }}>Active</span> :
    <span style={{ color: "var(--color-smoke)" }}>Expired</span>;

  return (
    <div className={styles.purchaseItemWrapper}>
      <div>

        <div className={styles.purchaseRow}>
          <p className={styles.purchaseProductName}>
            {products?.find(product => product.id === purchase.productId)?.name ?? purchase.product_name}
          </p>
          <span
            className={classNames(styles.purchaseList, !purchase?.list?.name && !isExpired ? styles.warning : undefined)}>
            {purchase?.list?.name ?? "List deleted"}
          </span>
        </div>

        <p className={styles.purchaseProductBuyerName}>{purchase.username} <Copyable text={purchase.steam_id} /></p>

      </div>
      <div className={styles.purchaseTimeLeft}>
        <PurchaseDateCountdown purchase={purchase} />
      </div>
      <div className={styles.purchaseLeftSide}>
        <p className={styles.purchaseStatus}>{purchaseStatus}</p>
        {!isExpired ? purchase.isCanceled ? (
          <Button type="primary" loading={loading} onClick={activateHandler}>
            Activate
          </Button>
        ) : (
          <Button type="primary" danger onClick={deactivateHandler} loading={loading}>
            Deactivate
          </Button>
        ) : null}
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsEditModalOpen(true)}
        />
      </div>
      <EditPurchaseModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} purchase={purchase} params={params}/>
    </div>
  );
};

export default PurchaseItem;
