type Props = {
  tab: string;
  handleClick: () => void;
};

const TabPickTexture = ({ tab, handleClick }: Props) => {
  return <div onClick={handleClick}>{tab}</div>;
};

export default TabPickTexture;
