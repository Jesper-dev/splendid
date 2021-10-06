import { Form } from "../components/Form";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const RentAdPage = () => {
  const ad = useSelector((state: RootState) => state.ad.AdObj);
  return (
    <section className="rentAdContainer">
      <h1>Uthyraren har godkänt din förfrågan!</h1>
      <div className="card">
        <div className="content">
          <img src={ad.pic} />
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
                <input type="checkbox" />
                <span>{values.pickUp}</span>
              </div>
              <div className="rentFormItemContainer">
                <input type="checkbox" />
                <span>{values.delivery}</span>
              </div>
              <label>{values.pay}</label>
              <div className="rentFormItemContainer">
                <input type="checkbox" />
                <span>{values.swish}</span>
              </div>
              <div className="rentFormItemContainer">
                <input type="checkbox" />
                <span>{values.card}</span>
              </div>
              <h1>Pris: {ad.price[0]} kr</h1>
              <div className="rentFormItemContainer">
                <input type="checkbox" />
                <span>{values.terms}</span>
              </div>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

export default RentAdPage;
