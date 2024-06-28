import { FC, useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";

import ClanNameInput from "./shared/ClanNameInput";
import ClanTagInput from "./shared/ClanTagInput";
import SelectAllowedLists from "./shared/SelectAllowedLists";

interface AddClanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const AddClanModal: FC<AddClanModalProps> = (props) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const values = Form.useWatch([], form);


  const handleOk = () => {
    props.setIsOpen(false);
  };
  const handleCancel = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(true);
        console.log(values);
      })
      .catch(() => setSubmittable(false));
  }, [values, props, form]);

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
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <ClanNameInput />
        <ClanTagInput />
        <SelectAllowedLists />
      </Form>
    </Modal>
  );
};

export default AddClanModal;