import { Link } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  price: string;
  adress: string;
  pic: string;
}

export const AdCard = ({ _id, title, price, adress, pic }: Props) => {
  return (
    <div className="adCardContainer">
      <h1>{title}</h1>
      <div className="pricePlaceContainer">
        <span>{price} kr/dag</span>
        <span>{adress ? adress : ""}</span>
      </div>
      <div className="picContainer">
        <img src={pic} alt="" />
      </div>
      <Link to={`/ad/${_id}`} className="adText">
        Hyr här!
      </Link>
    </div>
  );
};
