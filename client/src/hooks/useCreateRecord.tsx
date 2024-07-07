import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../query-keys";
import Record from "../types/models/Record";
import { createRecord } from "../services/records.service";

interface CreateRecordParams {
  clanId: number;
  listId: number;
  onSuccess?: (record: Record) => void;
  onError?: (errorMessage: string) => void;
}

const useCreateRecord = ({onSuccess, onError, clanId, listId}: CreateRecordParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecord,
    onSuccess: (createdRecord) => {
      queryClient.setQueryData(queryKeys.records(listId, clanId), (previous : Record[]) => {
        if (!previous) return [createdRecord];

        return [...previous, createdRecord];
      });

      if (onSuccess) onSuccess(createdRecord);
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useCreateRecord;