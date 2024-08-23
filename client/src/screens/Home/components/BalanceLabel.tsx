import { FC, useState } from "react";
import styles from "../Home.module.scss";
import useConfig from "../../../hooks/config/useConfig";
import { Button } from "antd";
import AddBalanceModal from "../modals/AddBalanceModal/AddBalanceModal";
import useBalance from "../../../hooks/payments/useBalance";

const BalanceLabel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: config} = useConfig();
  const {data: balance} = useBalance();

  return (
    <>
      <div className={styles.balanceLabel}>
        <div className={styles.balanceWrapper}>
          Balance: {balance?.balance ?? "Loading"} <span>{config?.payment?.general?.currency}</span>
        </div>
        {config?.payment?.stripe?.enabled && <Button onClick={() => setIsOpen(true)}>Add balance</Button>}
      </div>
      {config?.payment?.stripe?.enabled && <AddBalanceModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default BalanceLabel;