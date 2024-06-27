import { FC } from "react";
import styles from "./Clans.module.scss";
import ClanItem from "./ClanItem";
import PinnedClansWrapper from "./PinnedClansWrapper";
import ClansWrapper from "./ClansWrapper";
import useClans from "../../hooks/useClans";
import { Spin } from "antd";

const Clans: FC = () => {

  const {clans, isPending} = useClans();

  return (
    <Spin spinning={isPending} className={styles.loading} delay={200}>
      <div className={styles.wrapper}>
        {/*<PinnedClansWrapper>*/}
        {/*  <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />*/}
        {/*  <ClanItem name="Ukraine" tag="[UGA]" />*/}
        {/*  <ClanItem name="Ukraine Gaming" tag="[UGA]" />*/}
        {/*  <ClanItem name="Gaming" tag="[UGA]" />*/}
        {/*</PinnedClansWrapper>*/}

        <ClansWrapper>
          {isPending ? null : clans.map(clan => (
            <ClanItem name={clan.name} tag={clan.tag} />
          ))}
        </ClansWrapper>

      </div>
    </Spin>
  );
};

export default Clans;