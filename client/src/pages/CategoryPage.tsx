import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckSlug } from "../api/checkSlug";
import { AdCard } from "../components/discover/AdCard";
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

const CategoryPage = () => {
  const [state, setState] = useState<{
    dbObj: Array<DbObject>;
    done: boolean;
  }>({
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
    done: false,
  });
  let slug = CheckSlug();
  const history = useHistory();
  useEffect(() => {
    fetchDB();
  }, [slug]);

  const fetchDB = () => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/get")
      .then((res) => {
        const newArr = res.data.filter(
          (item: DbObject) => item.category === slug
        );
        setState((prev) => ({ ...prev, dbObj: newArr, done: true }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="categoryPageContainer">
      <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
      {state.done ? (
        state.dbObj.map((item, i) => {
          return (
            <AdCard
              key={i}
              title={item.title}
              price={item.price[0]}
              place={item.place}
              pic={item.pic ? item.pic : ""}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default CategoryPage;
