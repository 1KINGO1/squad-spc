import BalanceLabel from "./components/BalanceLabel";
import useConfig from "../../hooks/config/useConfig";
import ServerLabel from "./components/ServerLabel";
import { useEffect } from "react";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";
import styles from "./Home.module.scss";
import ProductList from "./elements/Products/ProductList";

let isMessageShown = false;

const Home = () => {
  const { data: config } = useConfig();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMessageShown) return;
    if (searchParams.has("redirect_status")) {
      const redirectStatus = searchParams.get("redirect_status");
      if (redirectStatus === "succeeded") {
        message.success("Balance successfully funded");
        setSearchParams(undefined);
      } else {
        message.error("Error during funding balance");
        setSearchParams(undefined);
      }
    }
    isMessageShown = true;
  }, []);

  return (
    <div>
      <div className={styles.topLabelWrapper}>
        {config?.payment?.general?.enabled && <BalanceLabel />}
        <ServerLabel />
      </div>
      {config?.payment?.general?.enabled && <ProductList />}
    </div>
  );
};

export default Home;