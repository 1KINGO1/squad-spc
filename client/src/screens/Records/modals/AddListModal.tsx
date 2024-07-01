import { FC, useEffect, useState } from "react";

import { Button, Form, Input, message, Modal } from "antd";

import config from "../../../config";
import useCreateList from "../../../hooks/useCreateList";
import useLists from "../../../hooks/useLists";

interface AddListModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface IFormValues {
  name: string;
  path: string;
}

export const AddListModal: FC<AddListModalProps> = (props) => {
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const {lists} = useLists();

  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

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

  const validateListName = (_: any, value: string) => {
    if (lists.find((list) => list.name === value)) {
      return Promise.reject("List with this name already exists");
    }
    return Promise.resolve();
  };

  const validateListPath = (_: any, value: string) => {
    if (lists.find((list) => list.path === value)) {
      return Promise.reject("List with this path already exists");
    }
    return Promise.resolve();
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

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
      >
        <Form.Item
          layout="vertical"
          label="List Name"
          name="name"
          rules={[{ max: 50, min: 4, required: true }, {validator: validateListName}]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="List Path"
          name="path"
          rules={[{ max: 10, min: 1, required: true }, {validator: validateListPath}]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input addonBefore={`${config.apiBaseUrl + config.paths.output.index + "/"}`}/>
        </Form.Item>
      </Form>

    </Modal>
  );
};