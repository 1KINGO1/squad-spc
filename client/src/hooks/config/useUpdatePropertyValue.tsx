import { useMutation, useQueryClient } from "@tanstack/react-query";

import Group from "../../types/models/Group";
import { updateConfigProperty } from "../../services/config.service";
import queryKeys from "../../query-keys";

interface UpdateConfigPropertyParams {
  onSuccess?: (changedProperty: any) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdatePropertyValue = ({onSuccess, onError}: UpdateConfigPropertyParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateConfigProperty,
    onSuccess: (changedProperty) => {
      queryClient.setQueryData(queryKeys.config(), (previous : {[key: string]: any}) => {
        const key = Object.keys(changedProperty)[0];
        const properties = key.split('.');

        let nextObj: any = previous;

        for (let i = 0; i < properties.length - 1; i++) {
          nextObj = nextObj[properties[i]];
        }

        nextObj[properties[properties.length - 1]] = changedProperty[key];

        return {...previous};
      });
      if (onSuccess) onSuccess(changedProperty);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdatePropertyValue;