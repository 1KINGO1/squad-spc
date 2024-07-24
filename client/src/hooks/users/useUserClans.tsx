import User from "../../types/models/User";
import useClans from "../clans/useClans";
import { useMemo } from "react";

const useUserClans = (user: User) => {
  const { clans } = useClans();

  return useMemo(() => {
    return clans?.filter((clan) => {
      return clan.clan_leaders.some((leader) => leader.id === user.id);
    });
  }, [clans]) ?? [];
}

export default useUserClans;