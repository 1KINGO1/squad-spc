import { FC, useMemo, useState } from "react";

import { CrownOutlined, DeleteOutlined, DownOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

import { Roles } from "../../../types/Roles";
import User from "../../../types/models/User";
import roleFilterOptions from "../data/roleFilterOptions";
import ClansModal from "../modals/ClansModal/ClansModal";
import UserRemoveModal from "../modals/UserRemoveModal/UserRemoveModal";

interface ManageUserProps {
  user: User;
}

const ManageUser: FC<ManageUserProps> = ({ user }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isClansModalOpen, setIsClanseModalOpen] = useState(false);

  const items = useMemo(() => [
    {
      label: "Role",
      key: "role",
      icon: <CrownOutlined />,
      children:
        roleFilterOptions.map(({ label, value }) => {
          return {
            label,
            key: value + "",
            onClick: () => console.log(value),
            disabled: user.permission === value || value === Roles.Root
          };
        })

    },
    {
      label: "Clans",
      key: "clans",
      icon: <UnlockOutlined />,
      onClick: () => setIsClanseModalOpen(true)
    },
    {
      label: "Delete",
      key: "delete",
      icon: <DeleteOutlined />,
      onClick: () => setIsRemoveModalOpen(true),
      danger: true
    }
  ], []);

  return (
    <>
      <Dropdown menu={{ items, expandIcon: <></> }}>
        <Button>
          <Space>
            Manage
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <UserRemoveModal user={user} isOpen={isRemoveModalOpen} setOpen={setIsRemoveModalOpen} />
      <ClansModal user={user} isOpen={isClansModalOpen} setIsOpen={setIsClanseModalOpen} />
    </>
  );
};

export default ManageUser;