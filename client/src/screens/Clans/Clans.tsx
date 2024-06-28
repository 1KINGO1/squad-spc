import { FC, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Spin } from "antd";

import ClanItem from "./ClanItem";
import styles from "./Clans.module.scss";
import ClansWrapper from "./ClansWrapper";
import AddClanModal from "./modals/AddClanModal";
import PinnedClansWrapper from "./PinnedClansWrapper";
import useClans from "../../hooks/useClans";
import usePinnedClans from "../../store/usePinnedClans";

const Clans: FC = () => {

  const [isClanAddModalVisible, setIsClanAddModalVisible] = useState(false);

  const { clans, isPending } = useClans();
  const { pinnedClanIds } = usePinnedClans();

  return (
    <>
      <Spin spinning={isPending} className={styles.loading} delay={200}>
        <div className={styles.wrapper}>

          {pinnedClanIds.length > 0 && (
            <PinnedClansWrapper>
              {clans.filter(clan => pinnedClanIds.includes(clan.id)).map(clan => (
                <ClanItem clan={clan} key={clan.id} />
              ))}
            </PinnedClansWrapper>
          )}

          <ClansWrapper>
            {isPending ? null : clans.filter(clan => !pinnedClanIds.includes(clan.id)).map(clan => (
              <ClanItem clan={clan} key={clan.id} />
            ))}
          </ClansWrapper>
        </div>
      </Spin>
      <FloatButton icon={<PlusOutlined />}
                   type="primary"
                   onClick={() => setIsClanAddModalVisible(true)}
                   shape="square"
                   className={styles.addClanButton}
      />
      <AddClanModal isOpen={isClanAddModalVisible} setIsOpen={setIsClanAddModalVisible} />
    </>

  );
};

export default Clans;