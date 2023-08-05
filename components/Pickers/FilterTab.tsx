import { EditorTabsEnum } from "@constants/CustomizerTabs";

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
      onClick={() => {
        if (alreadyActiveTabName == tabName) {
          return handlePickFilter("");
        } else {
          return handlePickFilter(tabName);
        }
      }}
    >
      {tabName}
    </div>
  );
};

export default FilterTab;
