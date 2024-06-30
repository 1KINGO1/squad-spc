import { FC, useEffect, useState } from "react";
import ClanNameInput from "./ClanNameInput";
import ClanTagInput from "./ClanTagInput";
import SelectAllowedLists from "./SelectAllowedLists";
import EditLimits from "./EditLimits";
import { Form, FormInstance } from "antd";
import IFormValues from "./IFormValues";

interface ClanFormProps {
  initialValues?: IFormValues,
  form: FormInstance<IFormValues>,
  setSubmittable: (submittable: boolean) => void,
}

const ClanForm: FC<ClanFormProps> = (
  {
    initialValues,
    setSubmittable,
    form
  }
) => {
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values) => {

        if (initialValues === undefined) return setSubmittable(true);

        if (
          values.name === initialValues.name &&
          values.tag === initialValues.tag &&
          values.allowed_lists + "" == initialValues.allowed_lists + "" &&
          JSON.stringify(values.limits) === JSON.stringify(initialValues.limits)
        ) setSubmittable(false);
        else setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, initialValues, form]);

  return (
    <>
      <Form
        initialValues={initialValues}
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <ClanNameInput />
        <ClanTagInput />
        <SelectAllowedLists />
        <EditLimits form={form} />
      </Form>
    </>
  );

};

export default ClanForm;