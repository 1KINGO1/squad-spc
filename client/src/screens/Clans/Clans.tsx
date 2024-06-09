import { FC } from "react";
import styles from "./Clans.module.scss";
import ClanItem from "./ClanItem";
import PinnedClansWrapper from "./PinnedClansWrapper";
import ClansWrapper from "./ClansWrapper";

const Clans: FC = () => {
  return (
    <div className={styles.wrapper}>
      <PinnedClansWrapper>
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming" tag="[UGA]" />
        <ClanItem name="Gaming" tag="[UGA]" />
      </PinnedClansWrapper>
      <ClansWrapper>
        <ClanItem name="CAT" tag="[UGA]" />
        <ClanItem name="MAMA" tag="[UGA]" />
        <ClanItem name="BROS" tag="[UGA]" />
        <ClanItem name="DTEK" tag="[UGA]" />
        <ClanItem name="ABOBA" tag="[UGA]" />
        <ClanItem name="sdffsdf" tag="[UGA]" />
        <ClanItem name="!ADMINS!" tag="[ADM]" />
        <ClanItem name="!WHITELISTS!" tag="[WHT]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
        <ClanItem name="Ukraine Gaming Alliance" tag="[UGA]" />
      </ClansWrapper>
    </div>
  );
};

export default Clans;