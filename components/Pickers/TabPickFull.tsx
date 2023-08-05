type Props = {
  tab: string;
  handleClick: () => void;
};

const TabPickFull = ({ tab, handleClick }: Props) => {
  return <div onClick={handleClick}>{tab}</div>;
};

export default TabPickFull;
