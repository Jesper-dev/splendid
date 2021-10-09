import { useEffect, useState } from "react";
import { CategoryCard } from "../components/discover/CategoryCard";
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

const Discover = () => {
  const [state, setState] = useState<{
    dbObj: Array<DbObject>;
    done: boolean;
    searchTerm: string;
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
    searchTerm: "",
  });
  const categoryTexts = ["Sport och Fritid", "Verktyg"]; //Texts for the two different categories.
  useEffect(() => {
    fetchDB();
  }, []);
  const fetchDB = () => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    //Fetching data from API
    //Kan inte använda functionen i API mappen för denna behöver en setState!
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/all")
      .then((res) =>
        setState((prev) => ({ ...prev, dbObj: res.data, done: true }))
      )
      .catch((err) => console.log(err));
  };

  /** Körs när vi klickar på sök knappen, för att få fram den ad man sökt på */
  const onFilterAdsClick = () => {
    const filteredArr = state.dbObj.filter((obj) =>
      obj.title.toLocaleLowerCase().includes(state.searchTerm.toLowerCase())
    );
    console.log(state.dbObj);
    setState((prev) => ({ ...prev, dbObj: filteredArr }));
  };

  /** Körs när vi skriver, används för att få tillbaka alla ads när sökrutan är tom */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text === "") {
      fetchDB();
    }
    setState((prev) => ({ ...prev, searchTerm: e.target.value }));
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
      <section className="searchbarContainer">
        <input
          type="text"
          value={state.searchTerm}
          onChange={(e) => onChangeSearch(e)}
        />
        <button onClick={() => onFilterAdsClick()}>sök</button>
      </section>
      <section className="recomendedContainer">
        <h3>Rekommenderade produkter</h3>
        {/* Mappar ut alla ads/annonser från datan vi hämta från databasen när allt är klart, done = true */}
        {state.done ? (
          state.dbObj.map((item, i) => {
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
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

export default Discover;
