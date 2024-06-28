import { FC, useEffect, useState } from "react";

import { Button, Form, message, Modal } from "antd";

import ClanNameInput from "./shared/ClanNameInput";
import ClanTagInput from "./shared/ClanTagInput";
import SelectAllowedLists from "./shared/SelectAllowedLists";
import useUpdateClan from "../../../hooks/useUpdateClan";
import Clan from "../../../types/models/Clan";

interface ClanEditModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clan: Clan;
}

const ClanEditModal: FC<ClanEditModalProps> = (props) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const values = Form.useWatch([], form);

  const mutation = useUpdateClan(
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

  const handleOk = () => {
    if (isLoading) return;

    mutation.mutate({
      id: props.clan.id,
      name: values.name || props.clan.name,
      tag: values.tag || props.clan,
      allowed_lists: values.allowed_lists
    });
    setIsLoading(true);
  };
  const handleCancel = () => {
    if (isLoading) return;

    props.setIsOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {
        if (
          values.name === props.clan.name &&
          values.tag === props.clan.tag &&
          values.allowed_lists + "" === props.clan.allowed_lists.map(list => list.id) + ""
        ) setSubmittable(false);
        else setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, props, form]);

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
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <ClanNameInput initialValue={props.clan.name} />
        <ClanTagInput initialValue={props.clan.tag} />
        <SelectAllowedLists initialValue={props.clan.allowed_lists.map(list => list.id)} />
      </Form>
    </Modal>
  );
};

export default ClanEditModal;