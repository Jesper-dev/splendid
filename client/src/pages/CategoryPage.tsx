import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CheckSlug } from "../api/checkSlug";
import { AdCard } from "../components/discover/AdCard";
import { Searchbar } from "../components/Searchbar";
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
    dbData: Array<DbObject>;
    done: boolean;
    searchTerm: string;
    searchArray: any[];
  }>({
    dbData: [
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
    searchTerm: "",
    searchArray: [],
  });
  let slug = CheckSlug();
  const history = useHistory();

  //Hämtar data från databasen och filtrear den direkt så att man enbart får annonser men den kategorin som man klicka på
  const fetchDB = useCallback(() => {
    //http://localhost:5000/api/ads/all
    //https://splendidsrv.herokuapp.com/api/ads/all
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/all")
      .then((res) => {
        const newArr = res.data.filter(
          (item: DbObject) => item.category === slug
        );
        setState((prev) => ({ ...prev, dbData: newArr, done: true }));
      })
      .catch((err) => console.log(err));
  }, [slug]);

  useEffect(() => {
    fetchDB();
  }, [slug, fetchDB]);

  /** Körs när vi skriver i sökruan, filtrerar dbObject arrayen och ger sökresultat */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchTerm: e.target.value }));
    const text = e.target.value;
    if (text === "") {
      setState((prev) => ({ ...prev, searchArray: [] }));
    } else {
      const filteredArr = state.dbData.filter((obj) =>
        obj.title.toLocaleLowerCase().includes(text.toLowerCase())
      );
      setState((prev) => ({ ...prev, searchArray: filteredArr }));
    }
  };

  return (
    <section className="categoryPageContainer">
      <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>

      <Searchbar searchTerm={state.searchTerm} onChange={onChangeSearch} />

      {state.done ? (
        state.searchArray.length === 0 ? (
          state.dbData.map((item, i) => {
            return (
              <AdCard
                key={i}
                _id={item._id}
                title={item.title}
                price={item.price[0]}
                place={item.place}
                pic={item.pic ? item.pic : ""}
              />
            );
          })
        ) : (
          state.searchArray.map((item, i) => {
            return (
              <AdCard
                key={i}
                _id={item._id}
                title={item.title}
                price={item.price[0]}
                place={item.place}
                pic={item.pic ? item.pic : ""}
              />
            );
          })
        )
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default CategoryPage;
