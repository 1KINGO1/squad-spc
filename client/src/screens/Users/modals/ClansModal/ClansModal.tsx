import { Button, Modal, Table } from "antd";
import { FC } from "react";
import User from "../../../../types/User";

interface ClansModalProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ClansModal: FC<ClansModalProps> = ({user, isOpen, setIsOpen}) => {

  const handleOk = () => setIsOpen(false);
  const handleCancel = () => setIsOpen(false);

  return (
    <Modal
      title="Change user clans"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={() => (
        <>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk} disabled>
            Save
          </Button>
        </>
      )}
    >

    </Modal>
  )
}

export default ClansModal;