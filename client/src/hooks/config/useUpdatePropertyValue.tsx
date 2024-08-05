import { useMutation } from "@tanstack/react-query";

import Group from "../../types/models/Group";
import { updateConfigProperty } from "../../services/config.service";

interface UpdateConfigPropertyParams {
  onSuccess?: (changedGroup: Group) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdatePropertyValue = ({onSuccess, onError}: UpdateConfigPropertyParams) => {
  return useMutation({
    mutationFn: updateConfigProperty,
    onSuccess: (changedProperty) => {
      if (onSuccess) onSuccess(changedProperty);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdatePropertyValue;