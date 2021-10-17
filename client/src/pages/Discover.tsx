import { useEffect, useState, useCallback } from "react";
import { CategoryCard } from "../components/discover/CategoryCard";
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

const Discover = () => {
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
  const categoryTexts = ["Sport och Fritid", "Verktyg"]; //Texts for the two different categories.

  const fetchDB = useCallback(() => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    //Fetching data from API
    //Kan inte använda functionen i API mappen för denna behöver en setState!
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/all")
      .then((res) =>
        setState((prev) => ({
          ...prev,
          dbData: res.data,
          done: true,
        }))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchDB();
  }, [fetchDB]);

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
    <>
      <section className="categoriesContainer">
        <h3>Kategorier</h3>
        {/* Mappar ut kategorierna från categoryTexts arrayen */}
        {categoryTexts.map((item, i) => {
          return <CategoryCard key={i} text={item} />;
        })}
      </section>
      <Searchbar searchTerm={state.searchTerm} onChange={onChangeSearch} />
      <section className="recomendedContainer">
        <h3>Rekommenderade produkter</h3>
        {/* Mappar ut alla ads/annonser från datan vi hämta från databasen när allt är klart, done = true */}
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
    </>
  );
};

export default Discover;
