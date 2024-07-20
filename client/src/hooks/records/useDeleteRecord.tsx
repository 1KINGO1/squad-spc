import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../../query-keys";
import { deleteRecord } from "../../services/records.service";
import Record from "../../types/models/Record";

interface DeleteRecordParams {
  clanId: number;
  listId: number;
  onSuccess?: (record: Record) => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteRecord = ({onSuccess, onError, clanId, listId}: DeleteRecordParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: (deletedRecord) => {
      queryClient.setQueryData(queryKeys.records(listId, clanId), (previous : Record[]) => {
        return [...previous].filter((record) => record.id !== deletedRecord.id);
      });

      if (onSuccess) onSuccess(deletedRecord);
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useDeleteRecord;