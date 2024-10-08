import { FC, useMemo, useState } from "react";

import { CrownOutlined, DeleteOutlined, DownOutlined, UnlockOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

import useCurrentUser from "../../../store/useCurrentUser";
import User from "../../../types/models/User";
import { Roles } from "../../../types/Roles";
import roleFilterOptions from "../data/roleFilterOptions";
import ClansModal from "../modals/ClansModal/ClansModal";
import UserRemoveModal from "../modals/UserRemoveModal/UserRemoveModal";
import useUpdateUserPermission from "../../../hooks/users/useUpdateUserPermission";
import useConfig from "../../../hooks/config/useConfig";
import BalanceModal from "../modals/BalanceModal/BalanceModal";

interface ManageUserProps {
  user: User;
}

const ManageUser: FC<ManageUserProps> = ({ user }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isClansModalOpen, setIsClanseModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {user: currentUser} = useCurrentUser();
  const { data: config } = useConfig();

  const mutateUserPermission = useUpdateUserPermission({
    onSuccess: () => setIsLoading(false)
  });

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
            onClick: () => {
              setIsLoading(true);
              mutateUserPermission.mutate({
                id: user.id,
                permission: value
              });
            },
            disabled: user.permission === value || value === Roles.Root || (currentUser?.permission ?? 0) <= value
          };
        })

    },
    [Roles.Admin, Roles.Root, Roles.Guest].includes(user.permission) ? null : {
      label: "Clans",
      key: "clans",
      icon: <UnlockOutlined />,
      onClick: () => setIsClanseModalOpen(true)
    },
    !config?.payment?.general?.enabled ? null : {
      label: "Balance",
      key: "balance",
      icon: <WalletOutlined />,
      onClick: () => setIsBalanceModalOpen(true)
    },
    {
      label: "Delete",
      key: "delete",
      icon: <DeleteOutlined />,
      onClick: () => setIsRemoveModalOpen(true),
      danger: true
    }
  ], [user, config]);

  return (
    <>
      <Dropdown
        menu={{ items, expandIcon: <></> }}
        disabled={user.permission >= (currentUser?.permission ?? -1)}
      >
        <Button loading={isLoading}>
          <Space>
            Manage
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <UserRemoveModal user={user} isOpen={isRemoveModalOpen} setOpen={setIsRemoveModalOpen} />
      <ClansModal user={user} isOpen={isClansModalOpen} setIsOpen={setIsClanseModalOpen} />
      {config?.payment?.general?.enabled && <BalanceModal user={user} isOpen={isBalanceModalOpen} setIsOpen={setIsBalanceModalOpen} /> }
    </>
  );
};

export default ManageUser;
