interface Props {
  text: string;
  onClickFunc: () => void;
}

export const MainBtn = ({ text, onClickFunc }: Props) => {
  return (
    <button className="mainBtn" onClick={() => onClickFunc()}>
      {text}
    </button>
  );
};
