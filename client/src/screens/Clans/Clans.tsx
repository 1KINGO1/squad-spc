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
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

const Clans: FC = () => {
  const {user} = useCurrentUser();

  const [isClanAddModalVisible, setIsClanAddModalVisible] = useState(false);

  const { clans, isPending } = useClans();
  const { pinnedClanIds } = usePinnedClans();

  return (
    <>
      <Spin spinning={isPending} className={styles.loading} delay={200}>
        <div className={styles.wrapper}>

          {pinnedClanIds.length > 0 && clans.filter(clan => pinnedClanIds.includes(clan.id)).length > 0 && (
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
            {clans.length === 0 && !isPending && (
              <div className={styles.noClans}>No available clans found</div>
            )}
          </ClansWrapper>
        </div>
      </Spin>
      <FloatButton icon={<PlusOutlined />}
                   type="primary"
                   onClick={() => setIsClanAddModalVisible(true)}
                   shape="square"
                   style={{display: user && [Roles.Root, Roles.Admin].includes(user.permission) ? "block" : "none"}}
                   className={styles.addClanButton}
      />
      <AddClanModal isOpen={isClanAddModalVisible} setIsOpen={setIsClanAddModalVisible} />
    </>

  );
};

export default Clans;