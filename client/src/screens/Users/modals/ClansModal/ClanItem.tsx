import { FC, useState } from "react";
import Clan from "../../../../types/models/Clan";

import styles from "../../Users.module.scss";
import parseTextToColor from "../../../../utils/parseTextToColor";
import { Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import User from "../../../../types/models/User";
import useUpdateUserClans from "../../../../hooks/users/useUpdateUserClans";
import useUserClans from "../../../../hooks/users/useUserClans";

interface ClanItemProps {
  clan: Clan,
  user: User,
  isSelected?: boolean,
}

export const ClanItem: FC<ClanItemProps> = ({ clan, isSelected = false, user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useUpdateUserClans({
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    }
  });
  const userClans = useUserClans(user);

  const clickHandler = () => {
    if (isLoading) return;
    setIsLoading(true);
    if (isSelected) {
      mutation.mutate({ id: user.id, clan_ids: userClans.filter(userClan => userClan.id !== clan.id).map(userClan => userClan.id) });
    }
    else {
      mutation.mutate({ id: user.id, clan_ids: [...userClans.map(userClan => userClan.id), clan.id] });
    }
  }

  return (
    <div
      className={styles.clanItem}
      style={{ borderColor: parseTextToColor(clan.name, "clan")[1], opacity: isSelected ? 1 : 0.5 }}
    >
      <p>{clan.name}</p>
      <Button loading={isLoading} icon={isSelected ? <CloseOutlined /> : <PlusOutlined />} onClick={clickHandler}/>
    </div>
  );
};