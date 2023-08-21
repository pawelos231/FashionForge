"use client";

import { EditorTabsEnum } from "@constants/CustomizerTabs";
import { Button } from "@UI/Button";

type Props = {
  tabName: EditorTabsEnum;
  alreadyActiveTabName: EditorTabsEnum | "";
  handlePickFilter: (tabName: EditorTabsEnum | "") => void;
};

const FilterTab = ({
  tabName,
  handlePickFilter,
  alreadyActiveTabName,
}: Props) => {
  return (
    <div
      className="w-full flex justify-center"
      onClick={() => {
        if (alreadyActiveTabName == tabName) {
          return handlePickFilter("");
        } else {
          return handlePickFilter(tabName);
        }
      }}
    >
      <Button variant={"outline"} className="w-[80%]">
        {tabName}
      </Button>
    </div>
  );
};

export default FilterTab;
