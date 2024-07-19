import { FC, useState } from "react";

import { Button, message, Modal, Space, Typography } from "antd";

import useDeleteGroup from "../../../hooks/useDeleteGroup";

const { Text } = Typography;

interface DeleteGroupModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  groupId: number;
}

export const DeleteGroupModal: FC<DeleteGroupModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteGroupMutation = useDeleteGroup({
    onSuccess: () => {
      message.success("Group deleted successfully");
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
    deleteGroupMutation.mutate(props.groupId);
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
        <Text>This action can't be undone. All records & limits relative to this group will be deleted.</Text>
      </Space>
    </Modal>
  );
};