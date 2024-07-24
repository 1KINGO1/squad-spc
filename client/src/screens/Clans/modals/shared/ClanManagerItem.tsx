import { FC } from "react";
import User from "../../../../types/models/User";
import styles from "../../Clans.module.scss";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useUpdateUserClans from "../../../../hooks/users/useUpdateUserClans";
import useUserClans from "../../../../hooks/users/useUserClans";
import useIsAdmin from "../../../../hooks/users/useIsAdmin";

interface ClanManagerItemProps {
  user: User;
  clanId: number;
}

const ClanManagerItem: FC<ClanManagerItemProps> = ({ user, clanId }) => {
  const mutation = useUpdateUserClans({});
  const userClans = useUserClans(user);

  const isAdmin = useIsAdmin();

  const handleDelete = () => {
    if (!userClans?.length) return;
    mutation.mutate({
      id: user.id,
      clan_ids: userClans.filter((clan) => clan.id !== clanId).map(({id}) => id),
    })
  }

  return (
    <div className={styles.clanManagerItem}>
      <div className={styles.clanManagerAvatarWrapper}>
        <img src={user.avatar_url} alt={user.username + "avatar"} />
      </div>
      <p className={styles.clanManagerNickname}>{user.username}</p>
      {
        isAdmin && (
          <div className={styles.deleteButtonWrapper}>
            <Button icon={<CloseOutlined />} onClick={handleDelete} />
          </div>
        )
      }
    </div>
  );
};

export default ClanManagerItem;