import { useEffect, useState, useCallback } from "react";
import { CategoryCard } from "../components/discover/CategoryCard";
import { AdCard } from "../components/discover/AdCard";
import { Searchbar } from "../components/Searchbar";
import { useDispatch } from "react-redux";
import { fetchDb } from "../redux/dbSlice";
import axios from "axios";

/*
********************************
I denna komponent så hämtar jag data
från min DB och skickar ut den till min "store".
********************************
*/

interface DbObject {
  _id: string;
  title: string;
  price: number[];
  desc: string;
  place: string;
  name: string;
  date: string;
  category: string;
  pic: string;
  address?: string;
  timeperiod?: string;
}

const Discover = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<{
    searchTerm: string;
    searchArray: any[];
    dbData?: Array<DbObject>;
    loading: boolean;
    didNotFindAny: boolean;
  }>({
    searchTerm: "",
    searchArray: [],
    loading: true,
    didNotFindAny: false,
  });
  const categoryTexts = ["Sport och Fritid", "Verktyg"]; //Texts for the two different categories.

  /** Körs när vi skriver i sökruan, filtrerar dbObject arrayen och ger sökresultat */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
    const text = e.target.value;
    let filteredArr: any[] = [];
    if (text === "") {
      setState((prev) => ({ ...prev, searchArray: [], didNotFindAny: false }));
    } else if (text !== "" && state.dbData) {
      state.dbData.forEach((obj) =>
        obj.title.toLocaleLowerCase().includes(text.toLowerCase())
          ? filteredArr.push(obj)
          : null
      );
      setState((prev) => ({ ...prev, searchArray: filteredArr }));
    } else if (state.searchArray.length === 0) {
      console.log("hej");
      setState((prev) => ({ ...prev, didNotFindAny: true }));
    }
  };

  const clearSearchterm = () => {
    setState((prev) => ({ ...prev, searchTerm: "" }));
  };

  /** Hämtar data från databsen */
  const fetchDB = useCallback(() => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    //Fetching data from API
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/all")
      .then((res) => {
        setState((prev) => ({ ...prev, dbData: res.data, loading: false }));
        dispatch(fetchDb(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    fetchDB();
  }, [fetchDB]);

  return (
    <>
      <section className="categoriesContainer">
        <h3>Kategorier</h3>
        {/* Mappar ut kategorierna från categoryTexts arrayen */}
        {categoryTexts.map((item, i) => {
          return <CategoryCard key={i} text={item} />;
        })}
      </section>
      <Searchbar
        searchTerm={state.searchTerm}
        onChange={onChangeSearch}
        clearSearchterm={clearSearchterm}
      />
      <section className="recomendedContainer">
        <h3>Rekommenderade produkter</h3>
        {/* Mappar ut alla ads/annonser från datan vi hämta från databasen */}
        {state.loading ? (
          <p>Laddar...</p>
        ) : state.didNotFindAny !== true &&
          state.dbData &&
          state.searchArray.length === 0 ? (
          state.dbData.map((item, i) => {
            return (
              <AdCard
                key={i}
                _id={item._id}
                title={item.title}
                price={item.price[0] ? item.price[0].toString() : "0"}
                place={item.place}
                pic={item.pic ? item.pic : ""}
              />
            );
          })
        ) : state.searchArray.length === 0 ? (
          <p>Hittar inga annonser, testa att söka igen</p>
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
        )}
      </section>
    </>
  );
};

export default Discover;
