import { FC } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import styles from "./Records.module.scss";
import useLists from "../../hooks/useLists";

const SelectRecordsLocation: FC = () => {

  const {lists} = useLists();
  const listsOptions = lists.map(list => ({value: list.id, label: list.name}));

  return (
    <div className={styles.selectRecordsLocationWrapper}>
      <div className={styles.listsSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          defaultValue={1}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listsOptions}
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
          defaultValue={1}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listsOptions}
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