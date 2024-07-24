import useUserClans from "../../../../hooks/users/useUserClans";
import useClans from "../../../../hooks/clans/useClans";
import { ClanItem } from "./ClanItem";
import { FC } from "react";
import User from "../../../../types/models/User";


interface ClanSelectProps {
  user: User;
}

const ClanSelect: FC<ClanSelectProps> = ({ user }) => {

  const userClans = useUserClans(user);
  const { clans: allClans } = useClans();

  return (
    <div>
      {
        allClans
          .filter(clan => userClans.every(userClan => userClan.id !== clan.id))
          .map((clan) => (
            <ClanItem clan={clan} key={clan.id} user={user}/>
          ))
      }
    </div>
  );
};

export default ClanSelect;