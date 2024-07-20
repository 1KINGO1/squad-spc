import { FC, useEffect, useState } from "react";

import { Button, Form, message, Modal } from "antd";

import { IFormValues } from "./shared/IFormValues";
import ListForm from "./shared/ListForm";
import useUpdateList from "../../../hooks/lists/useUpdateList";
import List from "../../../types/models/List";

interface EditListModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  list: List
}

export const EditListModal: FC<EditListModalProps> = (props) => {
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [requestError] = useState<string | null>(null);

  const listMutation = useUpdateList({
    onSuccess: () => {
      setIsLoading(false);
      form.resetFields();
      props.setIsOpen(false);
    },
    onError: (err) => {
      console.log(err);

      message.error(err);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {

        if (values.name === props.list.name && values.path === props.list.path) {
          return setSubmittable(false)
        }

        setSubmittable(true);

      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

  const handleOk = () => {
    setIsLoading(true);
    listMutation.mutate({
      listId: props.list.id,
      body: {
        name: values.name === props.list.name ? undefined : values.name,
        path: values.path === props.list.path ? undefined : values.path
      }
    });
  }

  const handleCancel = () => {
    props.setIsOpen(false);
  }

  return (
    <Modal
      open={props.isOpen}
      title={"Create new list"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                onClick={handleOk}
                loading={isLoading}
                disabled={!submittable || !!requestError}>
          Submit
        </Button>
      ]}
    >
      <ListForm form={form} initialValues={{name: props.list.name, path: props.list.path}}/>
    </Modal>
  );
};