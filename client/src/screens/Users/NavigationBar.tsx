import { FC } from "react";

import { Button, Input } from "antd";

import SelectRolesFilter from "./components/SelectRolesFilter";
import styles from "./Users.module.scss";

const NavigationBar: FC = () => {
  return (
    <div className={styles.navigationWrapper}>
      <Button type="primary">Create invite link</Button>
      <div className={styles.navigationSearchWrapper}>
        <Input.Search placeholder="Search a user by name" style={{ width: 450 }} allowClear />
        <SelectRolesFilter />
      </div>
    </div>
  );
};

export default NavigationBar;