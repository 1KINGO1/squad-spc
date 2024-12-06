import useConfig from "../../hooks/config/useConfig";
import { useNavigate } from "react-router";
import useAllPurchases from "../../hooks/purchases/useAllPurchases";
import { Pagination } from "antd";
import PurchaseItem from "./PurchaseItem";
import styles from "./Purchases.module.scss";
import { useEffect, useState } from "react";
import PurchaseFilters from "./PurchaseFilters";
import { GetAllPurchasesFilters } from "../../services/purchases.service";

const Purchases = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<GetAllPurchasesFilters>({});

  const { data: config, isLoading } = useConfig();
  const navigate = useNavigate();

  const params = {
    limit: 10,
    offset: (page - 1) * 10,
    ...filters
  }

  const { data } = useAllPurchases(params);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [page]);

  if (!config?.payment?.general?.enabled) {
    navigate("/");
    return null;
  }

  const pageChangeHandler = (page: number) => {
    setPage(page);
  }

  return (
    <>
      <PurchaseFilters filters={filters} setFilters={setFilters} setPage={setPage}/>
      <div className={styles.purchasesWrapper}>
        {!isLoading && data?.purchases.map((purchase) => (<PurchaseItem key={purchase.id} purchase={purchase} params={params} />))}
      </div>
      <div className={styles.paginationWrapper}>
        {!isLoading &&
          <Pagination defaultCurrent={data?.page} total={data?.total} onChange={pageChangeHandler} />}
      </div>
    </>
  );
};

export default Purchases;
