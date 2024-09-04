import { FC, useEffect, useMemo, useState } from "react";
import styles from "./AddBalanceModal.module.scss";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import useConfig from "../../../../hooks/config/useConfig";
import { Button, InputNumber, Modal, Spin } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import appConfig from "../../../../config";
import AddBalanceForm from "./AddBalanceForm";
import { LoadingOutlined } from "@ant-design/icons";
import usePaymentIntent from "../../../../hooks/payments/usePaymentIntent";

interface AddBalanceModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddBalanceModal: FC<AddBalanceModalProps> = (props) => {
  const { data: config } = useConfig();
  const [isLoading, setIsLoading] = useState(true);

  const {
    createPaymentIntent,
    updatePaymentIntent,
    cancelPaymentIntent,
    paymentIntent
  } = usePaymentIntent();

  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState(null);

  const defaultPaymentValue = config?.payment?.stripe?.minimumBalance || 25;

  useEffect(() => {
    if (!props.isOpen) return;
    createPaymentIntent(defaultPaymentValue).finally(() => setIsLoading(false));
  }, [props.isOpen]);

  const stripePromise = useMemo(() => {
    if (config?.payment?.stripe?.publicKey == undefined) return;
    return loadStripe(config?.payment?.stripe?.publicKey);
  }, [config]);

  const handleCancel = async () => {
    props.setIsOpen(false);
    await cancelPaymentIntent();
  };

  const onAmountBlur = async (e: any) => {
    const amount = +e.target.value;

    if (!amount || amount < defaultPaymentValue) {
      return;
    }
    setIsLoading(true);
    await updatePaymentIntent(+e.target.value);
    setIsLoading(false);
  };

  const payHandler = async () => {
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: appConfig.clientBaseUrl
      }
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      open={props.isOpen}
      title={"Add balance"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                disabled={!paymentIntent || isLoading}
                onClick={payHandler}
        >
          Pay
        </Button>
      ]}
    >
      <p className={styles.wrapper} dangerouslySetInnerHTML={{__html: config?.payment?.general?.motd}}></p>

      <InputNumber addonAfter={config?.payment?.stripe?.currency}
                   defaultValue={defaultPaymentValue}
                   onBlur={onAmountBlur}
                   min={defaultPaymentValue}
                   max={config?.payment?.stripe?.maximumBalance || 10000} />

      {
        paymentIntent && stripePromise ?
          <Elements stripe={stripePromise} options={{
            clientSecret: paymentIntent.client_secret, appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#FFFFFF33",
                colorBackground: "#181818"
              }
            }
          }}>
            <AddBalanceForm setStripe={(stripe) => setStripe(stripe)}
                            setElements={(elements) => setElements(elements)} />
          </Elements> : <Spin indicator={<LoadingOutlined spin />} />
      }

    </Modal>
  );
};

export default AddBalanceModal;