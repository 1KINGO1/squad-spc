import useConfig from "../../hooks/config/useConfig";
import { useNavigate } from "react-router";

const Purchases = () => {
  const { data: config } = useConfig();
  const navigate = useNavigate();

  if (!config?.payment?.general?.enabled) {
    navigate("/");
    return null;
  }

    return (
    <>
      <div>
        Purhcases
      </div>
    </>
  );
};

export default Purchases;
