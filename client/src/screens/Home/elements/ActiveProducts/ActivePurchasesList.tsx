import styles from "./ActivePurchases.module.scss";
import useActivePurchases from "../../../../hooks/purchases/useActivePurchases";
import ActivePurchase from "./ActivePurchase";

const ActivePurchasesList = () => {
  const {data: activePurchases, isSuccess} = useActivePurchases();

  return (
    <div className={styles.wrapper}>
      {isSuccess && activePurchases.map((purchase) => (
        <ActivePurchase purchase={purchase} key={purchase.id} />
      ))}
    </div>
  );
};

export default ActivePurchasesList;