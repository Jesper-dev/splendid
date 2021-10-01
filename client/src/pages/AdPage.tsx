import { useEffect, useState } from "react";
import { CheckSlug } from "../api/checkSlug";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MainBtn } from "../components/MainBtn";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/adSlice";

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
  address?: string;
}

const AdPage = () => {
  const ad = useSelector((state: RootState) => state.ad.AdObj);
  const dispatch = useDispatch();
  const history = useHistory();
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
      address: "",
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
        dispatch(add(res.data));
      })
      .catch((err) => console.log(err));
  };

  const onClick = () => {
    console.log("hej");
  };

  return (
    <section className="adPageContainer">
      <i
        className="fas fa-chevron-left goBack"
        onClick={() => history.goBack()}
      ></i>
      <img src={state.dbObj.pic} />
      <div className="contentContainer">
        <h1>{state.dbObj.title}</h1>
        <div className="container1">
          <p>{state.dbObj.price[0]} kr/dag</p>
          <p>{state.dbObj.address}</p>
        </div>
        <p>{state.dbObj.desc}</p>
        <h4>Priser</h4>
        <ul className="priceList">
          <li>1 dag {state.dbObj.price[0]} kr</li>
          <li>2 dagar {state.dbObj.price[1]} kr</li>
          <li>5 dagar {state.dbObj.price[2]} kr</li>
          <p>(Bokningsavgift på 50 kr tillkommer).</p>
        </ul>
        <Link to="/hyresvillkor">Hyresvillkor</Link>
      </div>
      <MainBtn text="Gör en förfrågan" onClickFunc={onClick} />
    </section>
  );
};

export default AdPage;
