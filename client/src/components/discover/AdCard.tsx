interface Props {
  title: string;
  price: string;
  place: string;
}

export const AdCard = ({ title, price, place }: Props) => {
  return (
    <div className="adCardContainer">
      <h1>{title}</h1>
      <div className="pricePlaceContainer">
        <span>{price} kr/dag</span>
        <span>{place}</span>
      </div>
      <div className="picContainer"></div>
      <button>Hyr här!</button>
    </div>
  );
};
