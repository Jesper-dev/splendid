import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/Form";
import { MainBtn } from "../components/MainBtn";
import { dbFunc } from "../api/db";

//Interface som beskvier bår req.body som vi skickar till databasen, (typescript only)
interface DbObj {
  category: string;
  title: string;
  desc: string;
  pic: string;
  price: number[];
  pickup: boolean;
  adress?: string;
  delivery: boolean;
  terms: string;
  value: number;
  date: number;
  timeperiod: string;
}

const CreateAd = () => {
  const history = useHistory();
  const [state, setState] = useState<{
    category: string;
    title: string;
    desc: string;
    priceArray: number[];
    price1: number;
    price2: number;
    price3: number;
    pickup: boolean;
    adress: string;
    delivery: boolean;
    terms: string;
    value: number;
    pic: any;
    timeperiod: string;
    picDone: boolean;
  }>({
    category: "Sport och Fritid",
    title: "",
    desc: "",
    priceArray: [0, 0, 0],
    price1: 0,
    price2: 0,
    price3: 0,
    pickup: false,
    adress: "",
    delivery: false,
    terms: "",
    value: 0,
    pic: "",
    timeperiod: "",
    picDone: false,
  });

  //Sätter värdet på alla states ovanför när vi skriver i formet
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
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
        const price1 = parseInt(e.target.value);
        setState((prev) => ({ ...prev, price1: price1 }));
        break;

      case "price2":
        const price2 = parseInt(e.target.value);
        setState((prev) => ({ ...prev, price2: price2 }));
        break;

      case "price3":
        const price3 = parseInt(e.target.value);
        setState((prev) => ({ ...prev, price3: price3 }));
        break;

      case "pickup":
        setState((prev) => ({ ...prev, pickup: !state.pickup }));
        break;

      case "adress":
        setState((prev) => ({ ...prev, adress: e.target.value }));
        break;

      case "delivery":
        setState((prev) => ({ ...prev, delivery: !state.delivery }));
        break;

      case "terms":
        setState((prev) => ({ ...prev, terms: e.target.value }));
        break;

      case "value":
        const value = parseInt(e.target.value);
        setState((prev) => ({ ...prev, value: value }));
        break;

      default:
        break;
    }
  };

  /** Används för att validera om man har tryckt i alla "required" fält */
  const validation = () => {
    if (state.category === "") {
      return false;
    } else if (state.title === "") {
      return false;
    } else if (state.desc === "") {
      return false;
    } else if (state.pic === "") {
      return false;
    } else if (!state.price1 || !state.price2 || !state.price3) {
      return false;
    } else if (state.pickup === false && state.delivery === false) {
      return false;
    } else if (state.adress === "") {
      return false;
    } else if (state.terms === "") {
      return false;
    } else if (!state.value) {
      return false;
    } else {
      return true;
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation()) {
      alert("Du har glömt något fält");
      return;
    }
    let arr: number[] = [];
    arr.push(state.price1, state.price2, state.price3);
    //Vårat objekt / req.body som vi skickar till API för att lägga till en annons i mongoDB / Databasen
    const newDbObj: DbObj = {
      category: state.category,
      title: state.title,
      desc: state.desc,
      pic: state.pic,
      pickup: state.pickup,
      adress: state.adress,
      delivery: state.delivery,
      price: arr,
      terms: state.terms,
      value: state.value,
      timeperiod: state.timeperiod,
      date: Date.now(),
    };
    //https://splendidsrv.herokuapp.com/api/ads/add
    //http://localhost:5000/api/ads/add
    dbFunc("https://splendidsrv.herokuapp.com/api/ads/add", "post", newDbObj);
    history.push("/complete");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    if (file.size > 55000) {
      alert("Bilden är för stor");
      setState((prev) => ({ ...prev, picDone: false, pic: "" }));
      return;
    } else {
      setState((prev) => ({ ...prev, picDone: true }));
      const reader = new FileReader();
      setState((prev) => ({ ...prev, pic: file }));
      reader.addEventListener(
        "load",
        () => {
          setState((prev) => ({ ...prev, pic: reader.result }));
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const onFileUpload = () => {
    if (state.picDone) {
      alert("Klart!");
    } else if (state.picDone === false) {
      alert("bilden är för stor, ladda upp en annan");
      setState((prev) => ({ ...prev, pic: "" }));
    }
  };

  return (
    <>
      <div className="addFormContainer">
        <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
        <Form
          submitFunc={submit}
          values={{
            category: "1. Kategori",
            desc: "2. Beskriv varan",
            picInfoText: "Måste vara en JPG och under 55kb storlek",
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
              <select name="" id="category" onChange={(e) => onChange(e)}>
                <option value="Sport och Fritid">Sport och Fritid</option>
                <option value="Verktyg">Verktyg</option>
              </select>
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
              <div className="chooseFileContainer">
                <input
                  className="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileChange(e)}
                />
                <span className="chooseImgBtn" onClick={() => onFileUpload()}>
                  Välj denna bild
                </span>
                <span className="infoText">({values.picInfoText})</span>
              </div>
              <label>{values.price}</label>
              <input
                placeholder="Pris för en dag"
                type="number"
                min={1}
                max={2000}
                id="price1"
                value={state.price1}
                onChange={(e) => onChange(e)}
              />
              <input
                placeholder="Pris för 3 dagar"
                type="number"
                min={1}
                max={2000}
                id="price2"
                value={state.price2}
                onChange={(e) => onChange(e)}
              />
              <input
                placeholder="Pris för en vecka"
                type="number"
                min={1}
                max={2000}
                id="price3"
                value={state.price3}
                onChange={(e) => onChange(e)}
              />
              <label>{values.options}</label>

              <div className="optionsContainer">
                <input
                  placeholder="Adress"
                  type="text"
                  id="adress"
                  value={state.adress}
                  onChange={(e) => onChange(e)}
                />
                <div>
                  <input
                    type="checkbox"
                    id="pickup"
                    checked={state.pickup}
                    onChange={(e) => onChange(e)}
                  ></input>
                  <span>Upphämtning</span>
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
                  genom att följa länken.{" "}
                  <span
                    className="linkTag"
                    onClick={() => history.push("/hyresvillkor")}
                  >
                    Läs om vår leveransprocess
                  </span>
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
                type="number"
                min={1}
                max={100000}
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

export default CreateAd;
