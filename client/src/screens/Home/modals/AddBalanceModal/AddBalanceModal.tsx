import { FC, FocusEventHandler, useEffect, useMemo, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import useConfig from "../../../../hooks/config/useConfig";
import { Button, InputNumber, Modal, Spin } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
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

  useEffect(() => {
    if (!props.isOpen) return;
    createPaymentIntent(config?.payment?.stripe?.minimumBalance || 25).finally(() => setIsLoading(false));
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
    await updatePaymentIntent(+e.target.value);
  };

  const payHandler = async () => {
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
  };

  return (
    !isLoading ?
      <Modal
        open={props.isOpen}
        title={"Add balance"}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} loading={isLoading} disabled={isLoading}>
            Cancel
          </Button>,
          <Button key="submit"
                  type="primary"
                  disabled={!paymentIntent || isLoading}
                  loading={isLoading}
                  onClick={payHandler}
          >
            Pay
          </Button>
        ]}
      >
        <InputNumber addonAfter={config?.payment?.stripe?.currency}
                     defaultValue={100}
                     onBlur={onAmountBlur}
                     min={config?.payment?.stripe?.minimumBalance || 25}
                     max={config?.payment?.stripe?.maximumBalance || 10000} />

        {
          paymentIntent && stripePromise ?
            <Elements stripe={stripePromise} options={{
              clientSecret: paymentIntent.client_secret, appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#FFFFFF33",
                  colorBackground: "#181818",
                }
              }
            }}>
              <AddBalanceForm setStripe={(stripe) => setStripe(stripe)}
                              setElements={(elements) => setElements(elements)} />
            </Elements> : <Spin indicator={<LoadingOutlined spin />} />
        }

      </Modal> : null
  );
};

export default AddBalanceModal;