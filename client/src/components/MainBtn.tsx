interface Props {
  text: string;
}

export const MainBtn = ({ text }: Props) => {
  return <button className="mainBtn">{text}</button>;
};
