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

const TabPickFull = ({ tab, handleClick, filterObj }: Props) => {
  console.log(filterObj);
  return (
    <div
      onClick={() =>
        handleClick({ ...filterObj, stylishShirt: !filterObj.stylishShirt })
      }
    >
      {tab}
    </div>
  );
};

export default TabPickFull;
