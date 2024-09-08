import { FC } from "react";
import styles from "./ConfirmPurchaseModal.module.scss";
import { Button, message, Modal } from "antd";
import { Product } from "../../../../types/models/Product";
import useBalance from "../../../../hooks/payments/useBalance";
import useConfig from "../../../../hooks/config/useConfig";
import usePurchase from "../../../../hooks/purchases/usePurchase";

interface ConfirmPurchaseModalProps {
  isOpen: boolean;
  product: Product;
  setIsOpen: (isOpen: boolean) => void;
}

const ConfirmPurchaseModal: FC<ConfirmPurchaseModalProps> = (props) => {
  const { data: balance } = useBalance();
  const { data: config } = useConfig();

  const purchaseMutation = usePurchase({
    onSuccess: () => {
      props.setIsOpen(false);
      message.success("Product purchased successfully!");
    },
    onError: (error) => {
      message.error(error);
    }
  });

  const handleCancel = () => {
    props.setIsOpen(false);
  };

  const handleBuy = () => {
    purchaseMutation.mutate({ productId: props.product.id, desiredPrice: props.product.price });
  };

  return (
    <Modal
      open={props.isOpen}
      title={"Buy " + props.product.name}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                onClick={handleBuy}
        >
          Buy
        </Button>
      ]}
    >
      <p className={styles.wrapper}>
        Are you sure you want to buy <span className={styles.productName}>
          {props.product.name}
        </span> for {props.product.price} <span
        className={styles.currency}>{config?.payment?.general?.currency}</span> ?
        <br />
        The rest of your balance will be {balance?.balance as number - props.product.price} <span
        className={styles.currency}>{config?.payment?.general?.currency}</span>
      </p>
    </Modal>
  );
};

export default ConfirmPurchaseModal;