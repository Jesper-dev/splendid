import swish from "../img/swish.png";
import card from "../img/card.png";
import { MainBtn } from "../components/MainBtn";
import { usePathname } from "../hooks/urlHook";
import { useHistory } from "react-router";

const PayPage = () => {
  const pathname = usePathname();
  const history = useHistory();
  return (
    <section className="payContainer">
      {pathname.includes("/swish") ? (
        <img src={swish} className="swishLogo" alt="swish logo" />
      ) : (
        <img src={card} className="cardLogo" alt="swish logo" />
      )}
      <MainBtn text="Betala" onClickFunc={() => history.push("/discover")} />
    </section>
  );
};

export default PayPage;
