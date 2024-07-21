import { FC, startTransition } from "react";

import { Button, Input } from "antd";

import SelectRolesFilter from "./components/SelectRolesFilter";
import styles from "./Users.module.scss";
import useUsersFilter from "../../store/useUsersFilter";

const NavigationBar: FC = () => {

  const { searchValue, setSearchValue } = useUsersFilter();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchValue(e.target.value);
    });
  }

  return (
    <div className={styles.navigationWrapper}>
      <Button type="primary">Create invite link</Button>
      <div className={styles.navigationSearchWrapper}>
        <Input.Search placeholder="Search a user by name"
                      style={{ width: 450 }}
                      allowClear
                      value={searchValue}
                      onChange={inputChangeHandler}
        />
        <SelectRolesFilter />
      </div>
    </div>
  );
};

export default NavigationBar;