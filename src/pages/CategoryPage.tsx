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
    searchTerm: string;
    filteredList: any[];
    loading: boolean;
    didNotFindAny: boolean;
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
    searchTerm: "",
    filteredList: [],
    loading: true,
    didNotFindAny: false,
  });
  let slug = CheckSlug();
  const history = useHistory();

  useEffect(() => {
    const newArr = data.filter((item: DbObject) => item.category === slug);
    setState((prev) => ({ ...prev, categoryData: newArr, loading: false }));
  }, [slug, data]);

  /** Körs när vi skriver i sökruan, filtrerar data (redux) arrayen och ger sökresultatet */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setState((prev) => ({
      ...prev,
      searchTerm: text,
      filteredList: [],
      didNotFindAny: false,
    }));
    const searchList = state.categoryData?.filter((item) => {
      return item.title
        .toLowerCase()
        .trim()
        .includes(text.toLowerCase().trim());
    });
    //Det finns inga annonser som matchar söktermen
    if (searchList?.length === 0) {
      setState((prev) => ({
        ...prev,
        didNotFindAny: true,
        filteredList: [],
      }));
    } else if (text === "") {
      //Man raderar all text och får tillbaka alla annonser som fanns innan
      setState((prev) => ({ ...prev, filteredList: [], didNotFindAny: false }));
    } else if (searchList && searchList?.length > 0) {
      //Vi har hittar en annons som matchar söktermen
      setState((prev) => ({
        ...prev,
        filteredList: searchList,
        didNotFindAny: false,
      }));
    }
  };

  const clearSearchterm = () => {
    setState((prev) => ({
      ...prev,
      searchTerm: "",
      didNotFindAny: false,
      filteredList: [],
    }));
  };

  return (
    <section className="categoryPageContainer">
      <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
      <Searchbar
        searchTerm={state.searchTerm}
        onChange={onChangeSearch}
        clearSearchterm={clearSearchterm}
      />
      {/* Mappar ut alla ads/annonser från datan vi hämta från databasen */}
      {state.loading ? (
        <p>Laddar...</p>
      ) : state.didNotFindAny !== true &&
        state.categoryData &&
        state.filteredList.length === 0 ? (
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
      ) : state.didNotFindAny ? (
        <p>Hittar inga annonser, testa att söka igen</p>
      ) : (
        state.filteredList.map((item, i) => {
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
      )}
    </section>
  );
};

export default CategoryPage;
