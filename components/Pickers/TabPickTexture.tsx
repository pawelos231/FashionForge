"use client";

export type ActiveFilterType = {
  logoShirt: boolean;
  stylishShirt: boolean;
};

type Props = {
  tab: string;
  filterObj: ActiveFilterType;
  handleClick: (changed: ActiveFilterType) => void;
};

const TabPickTexture = ({ tab, handleClick, filterObj }: Props) => {
  console.log(filterObj);
  return (
    <div
      onClick={() =>
        handleClick({ ...filterObj, logoShirt: !filterObj.logoShirt })
      }
    >
      {tab}
    </div>
  );
};

export default TabPickTexture;
