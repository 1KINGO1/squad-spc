import { FC } from "react";

import { Form, FormInstance, Input } from "antd";

import { IFormValues } from "./IFormValues";
import config from "../../../../config";
import useLists from "../../../../hooks/useLists";

interface ListFormProps {
  form: FormInstance<IFormValues>,
  initialValues?: IFormValues
}

const ListForm: FC<ListFormProps> = ({form, initialValues}) => {
  const {lists} = useLists();

  const validateListName = (_: any, value: string) => {
    if (lists.find((list) => list.name === value) && value !== initialValues?.name) {
      return Promise.reject("List with this name already exists");
    }
    return Promise.resolve();
  };

  const validateListPath = (_: any, value: string) => {
    if (lists.find((list) => list.path === value) && value !== initialValues?.path) {
      return Promise.reject("List with this path already exists");
    }
    return Promise.resolve();
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={initialValues}
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
  )
}

export default ListForm;