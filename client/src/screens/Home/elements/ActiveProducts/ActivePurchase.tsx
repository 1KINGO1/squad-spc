import { FC, useMemo } from "react";
import { Purchase } from "../../../../types/models/Purchase";
import styles from "./ActivePurchases.module.scss";
import DateCountdown from "../../../../components/DateCountdown";
import useProducts from "../../../../hooks/products/useProducts";

const ActivePurchase: FC<{ purchase: Purchase }> = ({ purchase }) => {
  const { data: products } = useProducts();

  const product = useMemo(() => {
    return products?.find((product) => product.id === purchase.productId);
  }, [products, purchase]);

  return (
    <div
      className={styles.item}
      style={{
        background: product?.productColor ? `linear-gradient(225deg, var(--color-black-2) 0%, ${product?.productColor ?? "var(--color-black-2)"}20 100%)` : undefined
      }}
    >
      <div className={styles.itemRightSide}>
        <p className={styles.itemTitle}>
          {purchase.product_name}
        </p>

        <span className={styles.itemList}>
          {purchase?.list?.name ?? "List deleted"}
        </span>

        {!product && (
          <span className={styles.itemList}>
            Product Deleted
          </span>
        )}
      </div>


      <div className={styles.itemLeftSide}>
        <span className={styles.itemExpireDate}>
          {purchase?.expire_date ? <DateCountdown date={new Date(purchase.expire_date)}/> : "No expire date"}
        </span>
        <span className={styles.itemStatusLabel}>Active</span>
        <span className={styles.itemCancelLabel}>Cancel</span>
      </div>

    </div>
  );
};

export default ActivePurchase;
