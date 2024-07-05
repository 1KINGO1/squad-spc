import { FC, useState } from "react";
import { Button, message, Modal, Space, Typography } from "antd";
import useDeleteClan from "../../../hooks/useDeleteClan";

const { Text } = Typography;

interface DeleteClanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clanId: number;
}

export const DeleteClanModal: FC<DeleteClanModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteClanMutation = useDeleteClan({
    onSuccess: () => {
      message.success("Clan deleted successfully");
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
    deleteClanMutation.mutate(props.clanId);
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
        <Text>This action can't be undone. All clan records will be deleted.</Text>
      </Space>
    </Modal>
  );
};