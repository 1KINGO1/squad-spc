import { Radio, RadioChangeEvent } from "antd";
import styles from "./Products.module.scss";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import useProducts from "../../../../hooks/products/useProducts";
import { Product } from "../../../../types/models/Product";

interface ListSelectProps {
  setListId: Dispatch<SetStateAction<number | null>>;
}

function getAvailableLists(products: Product[]): { id: number, name: string }[] {
  const lists: { id: number, name: string }[] = [];

  for (const product of products) {
    if (!product.shouldSale) continue;
    if (!lists.find((list) => list.id === product.list.id)) {
      lists.push(product.list);
    }
  }

  return lists;
}

const ListSelect: FC<ListSelectProps> = ({ setListId }) => {
  const { data } = useProducts();

  const selectHandler = (e: RadioChangeEvent) => {
    setListId(+e.target.value);
  };

  const lists = useMemo(() => {
    if (!data || !data.length) return;
    return getAvailableLists(data);
  }, [data]);

  return (
    <div className={styles.listSelectWrapper}>
      {lists && lists.length !== 0 ?
        <Radio.Group defaultValue={lists[0].id} buttonStyle="solid" onChange={selectHandler}>
          {lists.map(list => {
            return (
              <Radio.Button key={list.id} value={list.id}>{list.name}</Radio.Button>
            );
          })}
        </Radio.Group>
        : null
      }
    </div>
  );
};

export default ListSelect;