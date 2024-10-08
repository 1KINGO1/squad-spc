import { FC, useState } from "react";

import styles from "./BalanceModal.module.scss";
import { Button, InputNumber, message, Modal, Select } from "antd";
import User from "../../../../types/models/User";
import useUserBalance from "../../../../hooks/payments/useUserBalance";
import useConfig from "../../../../hooks/config/useConfig";
import useUpdateUserBalance from "../../../../hooks/payments/useUpdateUserBalance";

interface BalanceModalProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type BalanceModalAction = "add" | "subtract" | "set";

const ClansModal: FC<BalanceModalProps> = ({isOpen, setIsOpen, user}) => {
  const {data: config} = useConfig();
  const {data: userBalance, isLoading} = useUserBalance(user.steam_id, isOpen);
  const mutateBalance = useUpdateUserBalance({
    onSuccess: () => setIsOpen(false),
    onError: (errorMessage) => message.error(errorMessage),
  });
  const [action, setAction] = useState<BalanceModalAction>("add");
  const [actionValue, setActionValue] = useState<number>(0);

  const selectBefore = (
    <Select defaultValue="add" style={{ width: 120 }} onChange={(value) => setAction(value as BalanceModalAction)}>
      <Select.Option value="add">ADD</Select.Option>
      <Select.Option value="subtract">SUBTRACT</Select.Option>
      <Select.Option value="set">SET</Select.Option>
    </Select>
  );

  let featureBalance = (userBalance?.balance ?? 0);

  switch (action) {
    case "add":
      featureBalance += actionValue;
      break;
    case "subtract":
      featureBalance -= actionValue;
      break;
    case "set":
      featureBalance = actionValue;
      break
  }

  featureBalance = Math.max(0, featureBalance);

  const handleOk = () => {
    if (!userBalance) return;

    mutateBalance.mutate({
      steamId: user.steam_id,
      amount: featureBalance,
      currentBalance: userBalance.balance,
    });
  };
  const handleCancel = () => setIsOpen(false);

  const isSubmitDisabled = isLoading || (actionValue <= 0 && action !== "set");

  return (
    <Modal
      title="Change user balance"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={() => (
        <>
          <Button onClick={handleCancel} disabled={isSubmitDisabled}>
            Cancel
          </Button>
          <Button onClick={handleOk} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </>
      )}
    >
      <div>
        <InputNumber
          addonBefore={selectBefore}
          addonAfter={config?.payment?.general?.currency}
          value={actionValue}
          onChange={(value) => setActionValue(value as number)}
        />
        <p className={styles.middleText}>
          The balance will be <span className={styles.amount}>{featureBalance} {config?.payment?.general?.currency}</span>.
          Current balance is <span className={styles.amount}>{userBalance?.balance ?? 0} {config?.payment?.general?.currency}</span>
        </p>
      </div>
    </Modal>
  )
}

export default ClansModal;
