import { FC, useState } from "react";

import { Button, message, Modal, Space, Typography } from "antd";

import useDeleteList from "../../../hooks/lists/useDeleteList";

const { Text } = Typography;

interface DeleteListModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  listId: number;
}

export const DeleteListModal: FC<DeleteListModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteListMutation = useDeleteList({
    onSuccess: () => {
      message.success("List deleted successfully");
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
    deleteListMutation.mutate(props.listId);
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
        <Text>This action can't be undone. All list records will be deleted.</Text>
      </Space>
    </Modal>
  );
};