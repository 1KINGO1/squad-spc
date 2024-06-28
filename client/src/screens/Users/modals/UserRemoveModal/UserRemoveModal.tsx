import { FC } from "react";

import { Button, Modal } from "antd";

import User from "../../../../types/models/User";

interface UserRemoveModalProps {
  user: User,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void
}

const UserRemoveModal: FC<UserRemoveModalProps> = ({user, isOpen, setOpen}) => {

  const handleOk = () => {
    setOpen(false);
  }
  const handleCancel = () => {
    setOpen(false);
  }

  return (
    <Modal
      title={`Delete user ${user.username}`}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={() => (
        <>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk} danger>
            Delete
          </Button>
        </>
      )}
    >
      <p>Are you sure want to delete this user?</p>
      <p>This action can't be undone</p>
    </Modal>
  )
}

export default UserRemoveModal;