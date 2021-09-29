import { Link } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  price: string;
  place: string;
  pic: string;
}

export const AdCard = ({ _id, title, price, place, pic }: Props) => {
  return (
    <div className="adCardContainer">
      <h1>{title}</h1>
      <div className="pricePlaceContainer">
        <span>{price} kr/dag</span>
        <span>{place}</span>
      </div>
      <div className="picContainer">
        <img src={pic} alt="" />
      </div>
      <Link to={`/ad/${_id}`}>Hyr här!</Link>
    </div>
  );
};
