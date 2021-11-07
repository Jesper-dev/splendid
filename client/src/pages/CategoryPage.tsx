import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckSlug } from "../api/checkSlug";
import { AdCard } from "../components/discover/AdCard";
import { Searchbar } from "../components/Searchbar";
import { RootState } from "../store";
import { useSelector } from "react-redux";

interface DbObject {
  _id: string;
  title: string;
  price: number[];
  desc: string;
  name: string;
  date: string;
  category: string;
  pic: string;
  adress: string;
  timeperiod?: string;
}

const CategoryPage = () => {
  /** Redux data */
  const data = useSelector((state: RootState) => state.dbSlice.data);
  const [state, setState] = useState<{
    categoryData: Array<DbObject>;
    done: boolean;
    searchTerm: string;
    searchArray: any[];
  }>({
    categoryData: [
      {
        _id: "",
        title: "",
        price: [],
        desc: "",
        adress: "",
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

  useEffect(() => {
    const newArr = data.filter((item: DbObject) => item.category === slug);
    setState((prev) => ({ ...prev, categoryData: newArr, done: true }));
  }, [slug, data]);

  /** Körs när vi skriver i sökruan, filtrerar data (redux) arrayen och ger sökresultatet */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchTerm: e.target.value }));
    const text = e.target.value;
    if (text === "") {
      setState((prev) => ({ ...prev, searchArray: [] }));
    } else {
      const filteredArr = state.categoryData.filter((obj) =>
        obj.title.toLocaleLowerCase().includes(text.toLowerCase())
      );
      setState((prev) => ({ ...prev, searchArray: filteredArr }));
    }
  };

  const clearSearchterm = () => {
    setState((prev) => ({ ...prev, searchTerm: "" }));
  };

  return (
    <section className="categoryPageContainer">
      <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
      <Searchbar
        searchTerm={state.searchTerm}
        onChange={onChangeSearch}
        clearSearchterm={clearSearchterm}
      />
      {state.done ? (
        state.searchArray.length === 0 ? (
          state.categoryData.map((item, i) => {
            return (
              <AdCard
                key={i}
                _id={item._id}
                title={item.title}
                price={item.price[0] ? item.price[0].toString() : "0"}
                adress={item.adress}
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
                adress={item.adress}
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
