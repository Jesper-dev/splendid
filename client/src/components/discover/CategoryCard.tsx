interface Props {
  text: string;
}

export const CategoryCard = ({ text }: Props) => {
  return (
    <div className="categoryCardContainer">
      <p>{text}</p>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};
