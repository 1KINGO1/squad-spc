import { FC } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import styles from "./Records.module.scss";

const lists = [
  {
    value: "1",
    label: "Main"
  },
  {
    value: "2",
    label: "Server2"
  },
  {
    value: "3",
    label: "Server3"
  }
];

const SelectRecordsLocation: FC = () => {
  return (
    <div className={styles.selectRecordsLocationWrapper}>
      <div className={styles.listsSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          defaultValue={"1"}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={lists}
        />

        <div className={styles.listsSelectButtonWrapper}>
          <Button icon={<PlusOutlined />}/>
          <Button icon={<EditOutlined />}/>
          <Button icon={<ExportOutlined />}/>
          <Button icon={<DeleteOutlined />}/>
        </div>
      </div>
      <div className={styles.clansSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          defaultValue={"1"}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={lists}
        />
        <div className={styles.clansSelectInfoWrapper}>
          <Button disabled block>
            Total: 99
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectRecordsLocation;