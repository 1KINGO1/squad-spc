import {
  useQuery,
} from '@tanstack/react-query'
import { QueryKeys } from "../types/QueryKeys";
import { getClans } from "../services/clans.service";
import useCurrentUser from "../store/useCurrentUser";
import Clan from '../types/Clans';

const useClans = () => {
  const {user} = useCurrentUser();
  const query = useQuery({ queryKey: [QueryKeys.Clans], queryFn: getClans, enabled: user !== null });

  return {
    clans: query.data || [] as Clan[],
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
  }
}

export default useClans;