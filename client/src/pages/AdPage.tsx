import { useEffect, useState } from "react";
import { CheckSlug } from "../api/checkSlug";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MainBtn } from "../components/MainBtn";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux/adSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  timeperiod?: string;
}

const AdPage = () => {
  const ad = useSelector((state: RootState) => state.ad.AdObj);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, onChange] = useState(new Date());
  const [state, setState] = useState<{
    dbObj: DbObject;
    done: boolean;
    showCalendar: boolean;
    showInfo: boolean;
    infoPrice: number;
  }>({
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
    showCalendar: false,
    showInfo: false,
    infoPrice: 0,
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
    setState((prev) => ({ ...prev, showCalendar: true }));
    console.log("hej");
  };

  //Sätter vilken dag man valt i globala db objekt state (redux)
  const onClickCalendar = () => {
    const priceInt = parseInt(state.dbObj.price[0]);
    state.dbObj = { ...state.dbObj, timeperiod: value.toDateString() };
    dispatch(add(state.dbObj));
    setState((prev) => ({ ...prev, showInfo: true, infoPrice: priceInt }));
  };

  const onSubmitCalendar = () => {
    console.log("hej");
  };

  return (
    <>
      <section className="adPageContainer">
        {state.showCalendar ? (
          <div className="calendarContainer">
            <div className="calendarHeader">
              <div>
                <i
                  className="fas fa-chevron-left goBack calendarBack"
                  onClick={() =>
                    setState((prev) => ({ ...prev, showCalendar: false }))
                  }
                ></i>
                <h1>välj hyresperiod</h1>
              </div>
            </div>
            <Calendar
              onChange={onChange}
              value={value}
              onClickDay={onClickCalendar}
            />
            {state.showInfo ? (
              <div className="infoContainer">
                <p>
                  Låna <span>{value.toDateString().slice(0, 15)}</span>
                </p>
                <h1>Pris: {state.infoPrice + 50}</h1>
                <span>Inklusive bokningsavgift</span>
              </div>
            ) : null}
            <Link to="/rent">
              <MainBtn text="Skicka förfrågan" onClickFunc={onSubmitCalendar} />{" "}
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>
    </>
  );
};

export default AdPage;
