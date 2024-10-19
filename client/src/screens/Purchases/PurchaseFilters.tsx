import styles from "./Purchases.module.scss";
import { Button, Checkbox, Input } from "antd";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { GetAllPurchasesFilters } from "../../services/purchases.service";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface PurchaseFiltersProps {
  filters: GetAllPurchasesFilters,
  setFilters: Dispatch<SetStateAction<GetAllPurchasesFilters>>,
  setPage: Dispatch<SetStateAction<number>>
}

const PurchaseFilters: FC<PurchaseFiltersProps> = ({ filters, setFilters, setPage }) => {
  const [searchValue, setSearchValue] = useState<string>(filters.search ?? "");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  const handleSearchBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setPage(1);
  };

  const handleCheckboxHadListChange = (e: CheckboxChangeEvent) => {
    setFilters((prev) => ({ ...prev, nolist: !e.target.checked }));
    setPage(1);
  };

  const handleCheckboxIsActiveChange = (e: CheckboxChangeEvent) => {
    setFilters((prev) => ({ ...prev, active: e.target.checked }));
    setPage(1);
  };

  const resetButtonHandler = () => {
    setFilters(() => { return {} });
    setSearchValue("");
    setPage(1);
  }

  return (
    <div className={styles.purchaseFilterWrapper}>
      <Input placeholder="Filter by name or steamID" value={searchValue} onChange={handleSearchChange} onBlur={handleSearchBlur} />
      <Checkbox value={!filters.nolist ?? false} onChange={handleCheckboxHadListChange}>Has list</Checkbox>
      <Checkbox value={filters.active ?? false} onChange={handleCheckboxIsActiveChange}>Is active</Checkbox>
      {Object.keys(filters).length === 0 ? null :
        <Button type="primary" onClick={resetButtonHandler}>
          Reset Filters
        </Button>
      }
    </div>
  );
};

export default PurchaseFilters;
