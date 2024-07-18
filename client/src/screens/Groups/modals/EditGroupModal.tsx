import { FC, useEffect, useState } from "react";

import { Button, Form, Input, message, Modal, Select } from "antd";

import IFormValues from "./shared/IFormValues";
import usePermissions from "../../../hooks/usePermissions";
import useUpdateGroup from "../../../hooks/useUpdateGroup";
import GroupType from "../../../types/models/Group";
import Permission from "../../../types/models/Permission";
import useGroups from "../../../hooks/useGroups";
import Group from "../../../types/models/Group";

interface EditGroupModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  group: GroupType;
}

const validateGroupName = (groups: Group[]) => (_: any, value: string) => {
  if (groups.find((group) => group.name === value)) {
    return Promise.reject("Group with this name already exists");
  }
  return Promise.resolve();
}

const EditGroupModal: FC<EditGroupModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const {permissions} = usePermissions();
  const {groups} = useGroups();

  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);

  const mutation = useUpdateGroup({
    onSuccess: () => {
      props.setIsOpen(false);
    },
    onError: (err) => {
      message.error(err);
    }
  })

  const handleCancel = () => {
    form.resetFields();
    props.setIsOpen(false);
  }

  const handleOk = () => {
    mutation.mutate({
      id: props.group.id,
      name: values.name === props.group.name ? undefined : values.name,
      permissions: values.permissions.map(permission => (permissions.find(p => p.value === permission) as Permission).id)
    })
    props.setIsOpen(false);
  }

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {
        if (values.name === props.group.name && values.permissions + "" === props.group.permissions + "") {
          setSubmittable(false);
          return;
        }
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, form])

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
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          name: props.group.name,
          permissions: props.group.permissions.map(({ value }) => value)
        }}
      >
        <Form.Item
          layout="vertical"
          label="Group Name"
          name="name"
          rules={[{ max: 50, min: 4, required: true }, {validator: validateGroupName(groups)}]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Group Permissions"
          name="permissions"
          rules={[{ required: true, type: "array", min: 1, message: "Please select at least one permission"}]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            showSearch={true}
            options={permissions?.map(permission => ({ label: permission.name, value: permission.value,  }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditGroupModal;