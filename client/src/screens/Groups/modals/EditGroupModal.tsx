import { FC, useEffect, useMemo, useState } from "react";

import { Button, Form, message, Modal} from "antd";

import IFormValues from "./shared/IFormValues";
import usePermissions from "../../../hooks/usePermissions";
import useUpdateGroup from "../../../hooks/useUpdateGroup";
import GroupType from "../../../types/models/Group";
import Permission from "../../../types/models/Permission";
import GroupForm from "./shared/GroupForm";


interface EditGroupModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  group: GroupType;
}

const EditGroupModal: FC<EditGroupModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const { permissions } = usePermissions();
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const mutation = useUpdateGroup({
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
  const initialValues = useMemo(() => {
    return { name: props.group.name, permissions: props.group.permissions.map(p => p.value) };
  }, [props.group])

  const handleCancel = () => {
    props.setIsOpen(false);
  };
  const handleOk = () => {
    mutation.mutate({
      id: props.group.id,
      name: values.name === props.group.name ? undefined : values.name,
      permissions: values.permissions.map(permission => (permissions.find(p => p.value === permission) as Permission).id)
    });
    props.setIsOpen(false);
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {
        if (values.name === props.group.name && values.permissions + "" === props.group.permissions.map(p => p.value) + "") {
          setSubmittable(false);
          return;
        }
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

  return (
    <Modal
      open={props.isOpen}
      title={"Edit group " + props.group.name}
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
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default EditGroupModal;