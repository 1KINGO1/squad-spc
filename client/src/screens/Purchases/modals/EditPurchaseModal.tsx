import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { Purchase } from "../../../types/models/Purchase";
import useProducts from "../../../hooks/products/useProducts";
import useLists from "../../../hooks/lists/useLists";
import PurchaseDateCountdown from "../../../components/PurchaseDateCountdown";
import DurationInput from "../../../components/DurationInput";
import styles from "../Purchases.module.scss";
import useUpdatePurchase from "../../../hooks/purchases/useUpdatePurchase";
import { GetAllPurchasesParams } from "../../../services/purchases.service";

interface EditPurchaseModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  purchase: Purchase;
  params: GetAllPurchasesParams
}

export interface IFormValues {
  username: string,
  steam_id: string,
  productId: number | null,
  listId: number | null,
  duration: {
    action: "set" | "subtract" | "add",
    value: number,
    unit: number
  }
}

function calculateNewExpireDate(values: IFormValues, purchase: Purchase) {
  const hasExpirationDate = purchase.expire_date !== null;

  if (values == undefined || values.duration == undefined) return null;

  let newExpireDate: number | null = hasExpirationDate ? new Date(purchase.expire_date ?? 0).getTime() : null;
  switch (values.duration.action) {
    case "add":
      if (newExpireDate === null) break;
      newExpireDate += values.duration.unit * values.duration.value * 1000;
      break;
    case "subtract":
      if (newExpireDate === null) break;
      newExpireDate -= values.duration.unit * values.duration.value * 1000;
      break;
    case "set":
      newExpireDate =
        (purchase.cancel_date ? new Date(purchase.cancel_date).getTime() : Date.now())
        + values.duration.unit * values.duration.value * 1000;
      break;
  }

  return newExpireDate;
}

const EditPurchaseModal: FC<EditPurchaseModalProps> = (props) => {
  const [submittable, setSubmittable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: products } = useProducts();
  const { lists } = useLists();
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);
  const isProductDeleted = !products?.find(product => product.id === props.purchase.productId);

  const {mutate} = useUpdatePurchase({
    params: props.params,
    onSuccess(){
      setLoading(false);
      props.setIsOpen(false);
    },
    onError(){
      setLoading(false);
    }
  })

  const initialValues: IFormValues = {
    username: props.purchase.username,
    steam_id: props.purchase.steam_id,
    productId: props.purchase.productId ?? null,
    listId: props.purchase?.list?.id ?? null,
    duration: {
      action: "set",
      value: 0,
      unit: 60
    }
  };

  const handleOk = () => {
    if (!submittable) return;
    setLoading(true);

    mutate({
      purchaseId: props.purchase.id,
      username: values.username ?? undefined,
      steam_id: values.steam_id ?? undefined,
      listId: values.listId ?? undefined,
      productId: values.productId ?? undefined,
      expire_date: calculateNewExpireDate(values, props.purchase) ?? undefined
    })
  };
  const handleCancel = () => {
    form.resetFields();
    props.setIsOpen(false);
  };


  // Set first product from list as default on list change
  const handleValuesChange = (changedValues: IFormValues) => {
    if (changedValues.listId) {
      form.setFieldsValue({
        productId: (products?.filter((product) => product.list.id === changedValues.listId)[0])?.id ?? null
      });
    }
  };
  const newExpireDate = useMemo(() => {
    return calculateNewExpireDate(values, props.purchase);
  }, [values]);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

  return (
    <Modal
      open={props.isOpen}
      title={"Edit Purchase"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} loading={loading}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                disabled={!submittable}
                loading={loading}
                onClick={handleOk}>
          Submit
        </Button>
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          layout="vertical"
          label="Username"
          name="username"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Steam ID"
          name="steam_id"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ max: 17, min: 17, required: true, message: "SteamID 64 must be 17 characters long" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="List"
          name="listId"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "List is required" }]}
        >
          <Select placeholder="Select a list"
                  notFoundContent=":( There are no lists existing">
            {lists.map((list) => {
              return (
                <Select.Option key={list.id} value={list.id}>
                  {list.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <div className={styles.modalLabelWithCommentWrapper}>
          <Form.Item
            layout="vertical"
            label="Product"
            name="productId"
            style={{ margin: 0 }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select placeholder="Select a product"
                    notFoundContent=":( There are no products existing on this list"
                    defaultValue={props.purchase.productId}
            >
              {products?.filter((product) => product.list.id === values?.listId).map((product) => {
                return (
                  <Select.Option key={product.id} value={product.id}>
                    {product.name}
                  </Select.Option>
                );
              })}
              {isProductDeleted && props.purchase.productId !== null && (
                <Select.Option key={props.purchase.productId} value={props.purchase.productId} disabled>
                  Product deleted
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <p>Current permissions: {props.purchase.permissions}</p>
          {values?.productId !== props.purchase.productId && values?.productId != undefined && (
            <p>New
              permissions: {products?.find(product => product.id === values.productId)?.permissions?.map(permission => permission.name).join(", ")}</p>
          )}
        </div>


        <div className={styles.modalLabelWithCommentWrapper}>
          <Form.Item
            layout="vertical"
            label="Purchase duration"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{margin: 0}}
          >
            <DurationInput withAction
                           inputDurationClassName={styles.modalDurationInputPart}
                           inputUnitClassName={styles.modalDurationInputPart}
                           inputActionClassName={styles.modalDurationInputPart}
            />
          </Form.Item>
          <p>Current time left: <PurchaseDateCountdown purchase={props.purchase} /></p>
          {!!values?.duration?.value && newExpireDate !== null ? (<p>New time left: <PurchaseDateCountdown
            purchase={
              {
                expire_date: newExpireDate,
                isCanceled: props.purchase.isCanceled,
                cancel_date: props.purchase.cancel_date
              }
            }
            frozen
          />
          </p>) : null}
        </div>
      </Form>
    </Modal>
);
};

export default EditPurchaseModal;
