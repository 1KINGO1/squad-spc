import { FC, useEffect, useState } from "react";

import { Button, Form, message, Modal } from "antd";

import ClanForm from "./shared/ClanForm";
import IFormValues from "./shared/IFormValues";
import useCreateClan from "../../../hooks/clans/useCreateClan";
import useUpdateClanLimits from "../../../hooks/clans/useUpdateClanLimits";

interface AddClanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddClanModal: FC<AddClanModalProps> = (props) => {
  const [form] = Form.useForm<IFormValues>();
  const [createdClanId, setCreatedClanId] = useState<number | null>(null);
  const [submittable, setSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const values = Form.useWatch([], form);

  const limitsMutation = useUpdateClanLimits(createdClanId ?? 0);

  const mutation = useCreateClan({
    onSuccess: (data) => {
      setIsLoading(false);
      setCreatedClanId(data.id);
      props.setIsOpen(false);
    },
    onError: (errorMessage) => {
      setIsLoading(false);
      message.error(errorMessage);
    }
  });

  const handleOk = () => {
    setIsLoading(true);
    mutation.mutate(values);
  };
  const handleCancel = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    if (!createdClanId || !values?.limits?.length) return;
    limitsMutation.mutate(
      {
        limits: values.limits.map(limit => (
          { group_id: limit.group, limit: limit.limit ?? null }
        ))
      }
    );
    form.resetFields();
  }, [createdClanId]);

  return (
    <Modal
      open={props.isOpen}
      title={"Create new clan"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                onClick={handleOk}
                loading={isLoading}
                disabled={!submittable}>
          Submit
        </Button>
      ]}
    >
      <ClanForm form={form} setSubmittable={setSubmittable} />
    </Modal>
  );
};

export default AddClanModal;