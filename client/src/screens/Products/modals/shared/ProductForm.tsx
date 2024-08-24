import { ColorPicker, Form, FormInstance, Input, InputNumber, Select } from "antd";
import { FC, useEffect } from "react";
import { IFormValues } from "./IFormValues";
import useConfig from "../../../../hooks/config/useConfig";
import Product from "../../../Home/elements/Products/Product";
import styles from "../../Products.module.scss";
import usePermissions from "../../../../hooks/permissions/usePermissions";
import DurationInput from "../../../../components/DurationInput";
import objectsCompare from "../../../../utils/objectsCompare";

interface ProductFormProps {
  initialValues?: IFormValues,
  form: FormInstance<IFormValues>,
  setSubmittable: (submittable: boolean) => void,
}

const ProductForm: FC<ProductFormProps> = ({ initialValues, form, setSubmittable }) => {
  const { data: config } = useConfig();
  const { permissions } = usePermissions();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {

        if (initialValues === undefined) return setSubmittable(true);

        if (objectsCompare(values, initialValues)) setSubmittable(false);
        else setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, initialValues, form]);

  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="vertical"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item
        layout="vertical"
        label="Product Name"
        name="name"
        rules={[
          { max: 20, min: 4, required: true }
        ]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Product Description"
        name="description"
        rules={[
          { max: 500, min: 10, required: true }
        ]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Price"
        name="price"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          { required: true }
        ]}
      >
        <InputNumber
          suffix={config.payment.general.currency} max={999999999} min={1}
        />
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
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Duration"
      >
        <DurationInput
          placeholder="No expiration date"
          inputUnitClassName={styles.createProductModalDurationInputUnit}
          inputDurationClassName={styles.createProductModalDurationInputValue}
        />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Tag Value"
        name="tag"
        rules={[
          { min: 1, max: 20 }
        ]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Tag Color"
        name="tagColor"
        rules={[]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <ColorPicker format="hex" disabledAlpha/>
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Product Color"
        name="productColor"
        rules={[]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <ColorPicker format="hex" disabledAlpha/>
      </Form.Item>

      <div className={styles.productCreatePreviewWrapper}>
        <p>Preview: </p>
        {values &&
          <Product product={{
            id: 1,
            name: values.name,
            description: values.description,
            price: values.price,
            tag: values.tag ?? null,
            duration: 0,
            tagColor: values.tagColor ? values.tagColor.toHexString() : null,
            permissions: [{ id: 1, name: "whitelist", value: "whitelist" }],
            productColor: values.productColor ? values.productColor.toHexString() : null,
            shouldSale: true,
            list: { id: 1, name: "Any", path: "any", create_date: new Date() },
            create_date: new Date()
          }} isDisabled={true} />
        }
      </div>
    </Form>
  );
};

export default ProductForm;