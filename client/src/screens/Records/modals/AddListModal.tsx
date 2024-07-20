import { FC, useEffect, useState } from "react";

import { Button, Form, message, Modal } from "antd";

import { IFormValues } from "./shared/IFormValues";
import ListForm from "./shared/ListForm";
import useCreateList from "../../../hooks/useCreateList";

interface AddListModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddListModal: FC<AddListModalProps> = (props) => {
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [requestError] = useState<string | null>(null);

  const listMutation = useCreateList({
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

        setSubmittable(true);

      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

  const handleOk = () => {
    setIsLoading(true);
    listMutation.mutate(form.getFieldsValue() as IFormValues);
  }

  const handleCancel = () => {
    props.setIsOpen(false);
  }

  useEffect(() => {
    return () => {
      form.resetFields();
      setIsLoading(false);
      setSubmittable(false);
    };
  }, [props.isOpen]);

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

      <ListForm form={form}/>

    </Modal>
  );
};