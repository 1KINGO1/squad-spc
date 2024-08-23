import { FC, useState } from "react";

import { Button, message, Modal, Space, Typography } from "antd";

import useDeleteClan from "../../../hooks/clans/useDeleteClan";
import useDeleteProduct from "../../../hooks/products/useDeleteProduct";

const { Text } = Typography;

interface DeleteProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productId: number;
}

export const DeleteProductModal: FC<DeleteProductModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProductMutation = useDeleteProduct({
    onSuccess: () => {
      message.success("Product deleted successfully");
      props.setIsOpen(false);
      setIsLoading(false);
    },
    onError: (error) => {
      message.error(error);
    }
  });

  const handleCancel = () => {
    if (isLoading) return;
    props.setIsOpen(false);
  }

  const handleOk = () => {
    deleteProductMutation.mutate({id: props.productId});
    setIsLoading(true);
  }

  return (
    <Modal
      open={props.isOpen}
      title={"Are you sure?"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                danger
                onClick={handleOk}
                loading={isLoading}
        >
          Delete
        </Button>
      ]}
    >
      <Space direction="vertical">
        <Text>This action can't be undone.</Text>
      </Space>
    </Modal>
  );
};