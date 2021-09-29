import { useEffect, useState } from "react";
import { CheckSlug } from "../api/checkSlug";
import axios from "axios";

interface DbObject {
  _id: string;
  title: string;
  price: string[];
  desc: string;
  place: string;
  name: string;
  date: string;
  category: string;
  pic: string;
}

const AdPage = () => {
  const [state, setState] = useState<{ dbObj: DbObject; done: boolean }>({
    dbObj: {
      _id: "",
      title: "",
      price: [""],
      desc: "",
      place: "",
      name: "",
      date: "",
      category: "",
      pic: "",
    },

    done: false,
  });
  let slug = CheckSlug();
  useEffect(() => {
    fetchDB();
  }, []);
  const fetchDB = () => {
    //Fetching data from API
    //Kan inte använda functionen i API mappen för denna behöver en setState!
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/single", { id: slug })
      .then((res) => {
        setState((prev) => ({ ...prev, dbObj: res.data, done: true }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="adPageContainer">
      <img src={state.dbObj.pic} />
      <div>
        <h1>{state.dbObj.title}</h1>
        <p>{state.dbObj.price[0]}kr</p>
        <p>{state.dbObj.desc}</p>
        <h3>Priser</h3>
        <ul>
          <li>1 dag {state.dbObj.price[0]} kr</li>
          <li>2 dagar {state.dbObj.price[1]} kr</li>
          <li>5 dagar {state.dbObj.price[2]} kr</li>
        </ul>
        <p>(Bokningsavgift på 50 kr tillkommer).</p>
      </div>
    </section>
  );
};

export default AdPage;
