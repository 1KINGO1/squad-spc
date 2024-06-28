import { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Clan from "../../types/Clans";
import useUpdateClan from "../../hooks/useUpdateClan";

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

    mutation.mutate({ id: props.clan.id, name: values.name || props.clan.name, tag: values.tag || props.clan.tag });
    setIsLoading(true);
  };
  const handleCancel = () => {
    if (isLoading) return;

    props.setIsOpen(false);
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {
        if (values.name === props.clan.name && values.tag === props.clan.tag) setSubmittable(false);
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
        </Button
        >
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          layout="vertical"
          label="Clan Name"
          name="name"
          initialValue={props.clan.name}
          rules={[{ max: 50, min: 4 }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Clan Tag"
          name="tag"
          initialValue={props.clan.tag}
          rules={[{ max: 10, min: 1 }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClanEditModal;