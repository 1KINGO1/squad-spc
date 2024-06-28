import { FC } from "react";
import styles from "./Clans.module.scss";
import ClanItem from "./ClanItem";
import ClansWrapper from "./ClansWrapper";
import useClans from "../../hooks/useClans";
import { Spin } from "antd";
import PinnedClansWrapper from "./PinnedClansWrapper";
import usePinnedClans from "../../store/usePinnedClans";

const Clans: FC = () => {

  const { clans, isPending } = useClans();
  const { pinnedClanIds } = usePinnedClans();

  return (
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
  );
};

export default Clans;