import { Form } from "../components/Form";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { MainBtn } from "../components/MainBtn";

const RentAdPage = () => {
  const [state, setState] = useState<{
    pickup: boolean;
    delivery: boolean;
    swish: boolean;
    card: boolean;
    terms: boolean;
  }>({
    pickup: false,
    delivery: false,
    swish: false,
    card: false,
    terms: false,
  });

  const ad = useSelector((state: RootState) => state.ad.AdObj);
  const history = useHistory();
  const onCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "pickup":
        setState((prev) => ({
          ...prev,
          pickup: !state.pickup,
          delivery: false,
        }));
        break;

      case "delivery":
        setState((prev) => ({
          ...prev,
          delivery: !state.delivery,
          pickup: false,
        }));
        break;

      case "swish":
        setState((prev) => ({
          ...prev,
          swish: !state.swish,
          card: false,
        }));
        break;

      case "card":
        setState((prev) => ({
          ...prev,
          card: !state.card,
          swish: false,
        }));
        break;

      case "terms":
        setState((prev) => ({
          ...prev,
          terms: !state.terms,
        }));
        break;

      default:
        break;
    }
  };

  /** Används för att validera om man har tryckt i alla "required" fält */
  const validation = () => {
    if (state.pickup === false && state.delivery === false) {
      return false;
    } else if (state.swish === false && state.card === false) {
      return false;
    } else if (state.terms === false) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Om man klickat i att betala swish så tas man till /pay/swish sidan
   * Om man klickat i att betala med kort så tas man till /pay/card sidan
   */
  const onBtnClick = () => {
    if (!validation()) {
      alert("Du har glömt något fält");
    } else if (validation()) {
      if (state.swish) history.push("/pay/swish");
      else if (state.card) history.push("/pay/card");
    }
  };

  return (
    <section className="rentAdContainer">
      <h1>Uthyraren har godkänt din förfrågan!</h1>
      <div className="card">
        <div className="content">
          <img src={ad.pic} alt="ad img" />
          <div>
            <h3>{ad.title}</h3>
            <p>{ad.price[0]} kr/dag</p>
          </div>
        </div>
      </div>
      <p className="time">
        Låna: <span>{ad.timeperiod}</span>
      </p>
      {/* Form */}
      <div className="formContainerRent">
        <Form
          submitFunc={(e) => e.preventDefault()}
          values={{
            deliveryOptions: "Leveransalternativ:",
            pickUp: "Hämta själv",
            delivery: "Boka bud",
            pay: "Betala med:",
            swish: "swish",
            card: "kontantkort",
            terms: "Hyres- & avbokningsvillkor",
          }}
        >
          {(values) => (
            <>
              <label>{values.deliveryOptions}</label>
              <div className="rentFormItemContainer">
                <input
                  id="pickup"
                  type="checkbox"
                  checked={state.pickup}
                  onChange={(e) => onCheckboxClick(e)}
                />
                <span>{values.pickUp}</span>
              </div>
              <div className="rentFormItemContainer">
                <input
                  id="delivery"
                  type="checkbox"
                  checked={state.delivery}
                  onChange={(e) => onCheckboxClick(e)}
                />
                <span>{values.delivery}</span>
              </div>
              <label>{values.pay}</label>
              <div className="rentFormItemContainer">
                <input
                  id="swish"
                  type="checkbox"
                  checked={state.swish}
                  onChange={(e) => onCheckboxClick(e)}
                />
                <span>{values.swish}</span>
              </div>
              <div className="rentFormItemContainer">
                <input
                  id="card"
                  type="checkbox"
                  checked={state.card}
                  onChange={(e) => onCheckboxClick(e)}
                />
                <span>{values.card}</span>
              </div>
              <h1>Pris: {ad.totalPrice ? ad.totalPrice + 50 : 0} kr</h1>
              <div className="rentFormItemContainer">
                <input
                  id="terms"
                  type="checkbox"
                  checked={state.terms}
                  onChange={(e) => onCheckboxClick(e)}
                />
                <Link to="/hyresvillkor">{values.terms}</Link>
              </div>
              <MainBtn text="Boka och betala" onClickFunc={onBtnClick} />
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

export default RentAdPage;
