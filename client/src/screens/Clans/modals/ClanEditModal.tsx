import { FC, useMemo, useState } from "react";

import { Button, Form, message, Modal } from "antd";

import ClanForm from "./shared/ClanForm";
import IFormValues from "./shared/IFormValues";
import useClanLimits from "../../../hooks/clans/useClanLimits";
import useUpdateClan from "../../../hooks/clans/useUpdateClan";
import useUpdateClanLimits from "../../../hooks/clans/useUpdateClanLimits";
import Clan from "../../../types/models/Clan";

interface ClanEditModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clan: Clan;
}

const ClanEditModal: FC<ClanEditModalProps> = (props) => {
  const { limits } = useClanLimits(props.clan.id, !props.isOpen);
  const [form] = Form.useForm<IFormValues>();
  const [submittable, setSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const values = Form.useWatch([], form);

  const clanMutation = useUpdateClan(
    {
      onSuccess: () => {
        setIsLoading(false);
        props.setIsOpen(false);
      },
      onError: (errorMessage) => {
        message.error(errorMessage);
        setIsLoading(false);
      }
    }
  );
  const limitsMutation = useUpdateClanLimits(props.clan.id)

  const handleOk = () => {
    if (isLoading) return;

    clanMutation.mutate({
      id: props.clan.id,
      name: values.name || props.clan.name,
      tag: values.tag || props.clan.tag,
      allowed_lists: values.allowed_lists
    });
    limitsMutation.mutate({
      limits: values.limits.map((limit: {group: number, limit: number | undefined}) => {
        return {
          group_id: limit.group,
          limit: limit.limit ?? null
        }
      }) ?? []
    });
    setIsLoading(true);
  };
  const handleCancel = () => {
    if (isLoading) return;

    props.setIsOpen(false);
    form.resetFields();
  };

  const limitsMemo = useMemo(() => {
    return limits.map(limits => ({group: limits.group.id, limit: limits.limit ?? undefined}))
  }, [limits])

  return (
    <Modal
      open={props.isOpen}
      title={"Edit " + props.clan.name}
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
      <ClanForm form={form} setSubmittable={setSubmittable} initialValues={{
        name: props.clan.name,
        tag: props.clan.tag,
        allowed_lists: props.clan.allowed_lists.map(list => list.id),
        limits: limitsMemo
      }}/>
    </Modal>
  );
};

export default ClanEditModal;