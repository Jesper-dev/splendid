import { Link } from "react-router-dom";

interface Props {
  text: string;
}

export const CategoryCard = ({ text }: Props) => {
  return (
    <Link to={`/category/${text}`}>
      <div className="categoryCardContainer">
        <p>{text}</p>

        <i className="fas fa-chevron-right"></i>
      </div>
    </Link>
  );
};
