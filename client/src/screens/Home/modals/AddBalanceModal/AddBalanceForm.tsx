import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import styles from "../../Home.module.scss";

interface AddBalanceFormProps {
  setStripe: (stripe: any) => void;
  setElements: (elements: any) => void;
}

const AddBalanceForm = (props: AddBalanceFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    props.setElements(elements);
    props.setStripe(stripe);
  }, [stripe, elements]);

  return (
    <PaymentElement className={styles.paymentForm}/>
  );
};

export default AddBalanceForm;