import { useState } from "react";
import { Form } from "../components/Form";
import { MainBtn } from "../components/MainBtn";
import axios from "axios";

interface DbObj {
  category: string;
  title: string;
  desc: string;
  price: string[];
  // price1: string;
  // price2: string;
  // price3: string;
  pickup: boolean;
  adress?: string;
  delivery: boolean;
  terms: string;
  value: string;
  date: number;
}

const CreateAdd = () => {
  const [state, setState] = useState<{
    category: string;
    title: string;
    desc: string;
    priceArray: string[];
    price1: string;
    price2: string;
    price3: string;
    pickup: boolean;
    adress: string;
    delivery: boolean;
    terms: string;
    value: string;
  }>({
    category: "",
    title: "",
    desc: "",
    priceArray: [""],
    price1: "",
    price2: "",
    price3: "",
    pickup: false,
    adress: "",
    delivery: false,
    terms: "",
    value: "",
  });

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.target.id) {
      case "category":
        setState((prev) => ({ ...prev, category: e.target.value }));
        break;

      case "title":
        setState((prev) => ({ ...prev, title: e.target.value }));
        break;

      case "desc":
        setState((prev) => ({ ...prev, desc: e.target.value }));
        break;

      case "price1":
        setState((prev) => ({ ...prev, price1: e.target.value }));
        break;

      case "price2":
        setState((prev) => ({ ...prev, price2: e.target.value }));
        break;

      case "price3":
        setState((prev) => ({ ...prev, price3: e.target.value }));
        break;

      case "pickup":
        setState((prev) => ({ ...prev, pickup: !state.pickup }));
        break;

      case "adress":
        setState((prev) => ({ ...prev, adress: e.target.value }));
        console.log(state.adress);
        break;

      case "delivery":
        setState((prev) => ({ ...prev, delivery: !state.delivery }));
        break;

      case "terms":
        setState((prev) => ({ ...prev, terms: e.target.value }));
        break;

      case "value":
        setState((prev) => ({ ...prev, value: e.target.value }));
        break;

      default:
        break;
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let arr: string[] = [];
    arr.push(state.price1, state.price2, state.price3);

    const newDbObj: DbObj = {
      category: state.category,
      title: state.title,
      desc: state.desc,
      pickup: state.pickup,
      adress: state.pickup ? state.adress : "",
      delivery: state.delivery,
      price: arr,
      terms: state.terms,
      value: state.value,
      date: Date.now(),
    };
    sendToDb(newDbObj);
  };
  const sendToDb = (obj: DbObj) => {
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/add", obj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="addFormContainer">
        <Form
          submitFunc={submit}
          values={{
            category: "1. Kategori",
            desc: "2. Beskriv varan",
            pic: "3. Bilder",
            price: "4. Pris",
            options: "5. Alternativ för upphämtning",
            terms: "6. Villkor",
            value: "7. Värde",
          }}
        >
          {(values) => (
            <>
              <label>{values.category}</label>
              <input
                placeholder="Kategori"
                type="text"
                id="category"
                value={state.category}
                onChange={(e) => onChange(e)}
              ></input>

              <label>{values.desc}</label>
              <input
                placeholder="Rubrik"
                type="text"
                className="inputDescTitle"
                id="title"
                value={state.title}
                onChange={(e) => onChange(e)}
              />
              <textarea
                placeholder="Beskrivning"
                name=""
                id="desc"
                value={state.desc}
                onChange={(e) => onChange(e)}
              ></textarea>

              <label>{values.pic}</label>
              <input type="text"></input>

              <label>{values.price}</label>
              <input
                placeholder="Pris för en dag"
                type="text"
                id="price1"
                value={state.price1}
                onChange={(e) => onChange(e)}
              />
              <input
                placeholder="Pris för 3 dagar"
                type="text"
                id="price2"
                value={state.price2}
                onChange={(e) => onChange(e)}
              />
              <input
                placeholder="Pris för en vecka"
                type="text"
                id="price3"
                value={state.price3}
                onChange={(e) => onChange(e)}
              />

              <label>{values.options}</label>
              <div className="optionsContainer">
                <div>
                  <input
                    type="checkbox"
                    id="pickup"
                    checked={state.pickup}
                    onChange={(e) => onChange(e)}
                  ></input>
                  <span>Upphämtning</span>
                  {state.pickup ? (
                    <div className="adressContainer">
                      {" "}
                      <label> Adress: </label>{" "}
                      <input
                        type="text"
                        id="adress"
                        value={state.adress}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="delivery"
                    checked={state.delivery}
                    onChange={(e) => onChange(e)}
                  ></input>
                  <span>Leverans</span>
                </div>
                <p>
                  Splendid erbjuder användare ett miljövänligt
                  leveransalternativ för att göra lånadet mer tillgänligt för de
                  som saknar möjligheter för upphämtning. Se hur vi arbetar
                  genom att följa länken.
                </p>
              </div>

              <label>{values.terms}</label>
              <input
                placeholder="Villkor"
                type="text"
                id="terms"
                value={state.terms}
                onChange={(e) => onChange(e)}
              />

              <label>{values.value}</label>
              <input
                placeholder="Värde"
                type="text"
                id="value"
                value={state.value}
                onChange={(e) => onChange(e)}
              />

              <MainBtn text={"publicera annons"} />
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default CreateAdd;
