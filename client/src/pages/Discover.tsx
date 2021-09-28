import { useEffect, useState } from "react";
import { CategoryCard } from "../components/discover/CategoryCard";
import { AdCard } from "../components/discover/AdCard";
import { dbFunc } from "../api/db";
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

const Discover = () => {
  const [state, setState] = useState<{ dbObj: Array<DbObject> }>({
    dbObj: [
      {
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
    ],
  });
  const categoryTexts = ["Sport och Fritid", "Verktyg"];
  useEffect(() => {
    fetchDB();
    console.log(state.dbObj);
  }, []);
  const fetchDB = () => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/get")
      .then((res) => setState((prev) => ({ ...prev, dbObj: res.data })))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className="categoriesContainer">
        <h3>Kategorier</h3>
        {categoryTexts.map((item, i) => {
          return <CategoryCard key={i} text={item} />;
        })}
      </section>
      <section className="recomendedContainer">
        {state.dbObj.map((item, i) => {
          return (
            <AdCard
              key={i}
              title={item.title}
              price={item.price[0]}
              place={item.place}
              pic={item.pic ? item.pic : ""}
            />
          );
        })}
      </section>
    </>
  );
};

export default Discover;
