import { useEffect, useState, useCallback } from "react";
import { CategoryCard } from "../components/discover/CategoryCard";
import { AdCard } from "../components/discover/AdCard";
import { Searchbar } from "../components/Searchbar";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Discover = () => {
  const data = useSelector((state: RootState) => state.dbSlice.data);
  const [state, setState] = useState<{
    searchTerm: string;
    searchArray: any[];
    error: boolean;
  }>({
    searchTerm: "",
    searchArray: [],
    error: false,
  });
  const categoryTexts = ["Sport och Fritid", "Verktyg"]; //Texts for the two different categories.

  /** Körs när vi skriver i sökruan, filtrerar dbObject arrayen och ger sökresultat */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchTerm: e.target.value }));
    const text = e.target.value;
    if (text === "") {
      setState((prev) => ({ ...prev, searchArray: [] }));
    } else {
      const filteredArr = data.filter((obj) =>
        obj.title.toLocaleLowerCase().includes(text.toLowerCase())
      );
      setState((prev) => ({ ...prev, searchArray: filteredArr }));
    }
  };

  useEffect(() => {
    if (data[0]._id === "") setState((prev) => ({ ...prev, error: true }));
  }, []);

  return (
    <>
      {state.error ? (
        <h1>Något har gått fel, testa att gå tillbaka till första sidan</h1>
      ) : (
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
            {state.searchArray.length === 0
              ? data.map((item, i) => {
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
              : state.searchArray.map((item, i) => {
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
                })}
          </section>
        </>
      )}
    </>
  );
};

export default Discover;
