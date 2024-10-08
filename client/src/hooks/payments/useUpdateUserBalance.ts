import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserBalance } from "../../services/payments.service";
import Balance from "../../types/models/Balance";
import queryKeys from "../../query-keys";

interface UpdateUserBalanceParams {
  onSuccess?: (changedBalance: Balance) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateUserBalance = ({onSuccess, onError}: UpdateUserBalanceParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserBalance,
    onSuccess: (updatedBalance: Balance) => {
      queryClient.setQueryData(queryKeys.userBalance(updatedBalance.user.steam_id), updatedBalance);

      if (onSuccess) onSuccess(updatedBalance);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateUserBalance;
