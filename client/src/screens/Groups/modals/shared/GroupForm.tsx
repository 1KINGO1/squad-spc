import { FC, useEffect } from "react";

import { Form, FormInstance, Input, Select } from "antd";

import IFormValues from "./IFormValues";
import useGroups from "../../../../hooks/groups/useGroups";
import usePermissions from "../../../../hooks/permissions/usePermissions";
import Group from "../../../../types/models/Group";

interface GroupFormProps {
  form: FormInstance<IFormValues>,
  initialValues?: IFormValues
}

const validateGroupName = (groups: Group[], initialValue: string) => (_: any, value: string) => {
  if (value === initialValue) return Promise.resolve();
  if (groups.find((group) => group.name === value)) {
    return Promise.reject("Group with this name already exists");
  }
  return Promise.resolve();
};


const GroupForm: FC<GroupFormProps> = ({form, initialValues}) => {

  const { permissions } = usePermissions();
  const { groups } = useGroups();

  useEffect(() => {
    if (!initialValues) return;
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
      >
        <Form.Item
          layout="vertical"
          label="Group Name"
          name="name"
          rules={[
            { max: 50, min: 4, required: true },
            { validator: validateGroupName(groups, initialValues ? initialValues.name : "") }
          ]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Group Permissions"
          name="permissions"
          rules={[{ required: true, type: "array", min: 1, message: "Please select at least one permission" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            showSearch={true}
            options={permissions?.map(permission => ({ label: permission.name, value: permission.value }))}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default GroupForm;