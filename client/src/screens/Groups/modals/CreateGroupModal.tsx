import { FC, useEffect, useMemo, useState } from "react";

import { Button, Form, message, Modal} from "antd";

import IFormValues from "./shared/IFormValues";
import usePermissions from "../../../hooks/usePermissions";
import useUpdateGroup from "../../../hooks/useUpdateGroup";
import GroupType from "../../../types/models/Group";
import GroupForm from "./shared/GroupForm";
import useCreateGroup from "../../../hooks/useCreateGroup";
import Permission from "../../../types/models/Permission";


interface CreateGroupModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateGroupModal: FC<CreateGroupModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const { permissions } = usePermissions();
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const mutation = useCreateGroup({
    onSuccess: () => {
      form.resetFields();
      setSubmittable(false);
      setIsLoading(false);
      props.setIsOpen(false);
    },
    onError: (err) => {
      message.error(err);
    }
  });
  const handleCancel = () => {
    props.setIsOpen(false);
  };
  const handleOk = () => {
    setIsLoading(true);
    mutation.mutate({
      name: values.name,
      permissions: values.permissions.map(permission => (permissions.find(p => p.value === permission) as Permission).id)
    });
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

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
      title={"Create new group"}
      onCancel={handleCancel}
      loading={isLoading}
      footer={[
        <Button key="back" onClick={handleCancel} loading={isLoading}>
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
      <GroupForm
        form={form}
      />
    </Modal>
  );
};

export default CreateGroupModal;