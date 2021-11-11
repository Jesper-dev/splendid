import { useEffect, useState } from "react";
import { CheckSlug } from "../api/checkSlug";
import { Link, useHistory } from "react-router-dom";
import { MainBtn } from "../components/MainBtn";
import { useDispatch } from "react-redux";
import { add } from "../redux/adSlice";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  totalPrice?: number;
}

const AdPage = () => {
  const data = useSelector((state: RootState) => state.dbSlice.data);
  const [value, onChange] = useState(new Date());
  const [state, setState] = useState<{
    dbObj: DbObject;
    showCalendar: boolean;
    showInfo: boolean;
    totalPrice: number;
    daysToLend: string;
  }>({
    dbObj: {
      _id: "",
      title: "",
      price: [],
      desc: "",
      name: "",
      date: "",
      category: "",
      pic: "",
      adress: "",
      totalPrice: 0,
    },
    showCalendar: false,
    showInfo: false,
    totalPrice: 0,
    daysToLend: "",
  });
  let slug = CheckSlug();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const clickedAd = data.filter((item) => {
      return item._id === slug;
    });
    dispatch(add(clickedAd));
    setState((prev) => ({ ...prev, dbObj: clickedAd[0] }));
  }, [slug, data, dispatch]);

  //Sätter vilken dag man valt i globala db objekt state (redux)
  const onClickCalendar = () => {
    setState((prev) => ({ ...prev, totalPrice: state.dbObj.price[0] }));
    state.dbObj = {
      ...state.dbObj,
      timeperiod: value.toDateString(),
    };
    setState((prev) => ({ ...prev, showInfo: true }));
  };

  const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, daysToLend: e.target.value }));
    switch (e.target.value) {
      case "1 dag":
        setState((prev) => ({ ...prev, totalPrice: state.dbObj.price[0] }));
        break;
      case "2 dagar":
        setState((prev) => ({ ...prev, totalPrice: state.dbObj.price[1] }));
        break;
      case "5 dagar":
        setState((prev) => ({ ...prev, totalPrice: state.dbObj.price[2] }));
        break;

      default:
        break;
    }
  };

  const onSubmitCalendar = () => {
    state.dbObj = {
      ...state.dbObj,
      timeperiod: value.toDateString(),
      totalPrice: state.totalPrice,
    };
    dispatch(add(state.dbObj));
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
                <span>Låneperiod</span>
                <select name="" id="category" onChange={(e) => onDayChange(e)}>
                  <option value="1 dag">1 dag</option>
                  <option value="2 dagar">2 dagar</option>
                  <option value="5 dagar">5 dagar</option>
                </select>
                <h1>Pris: {state.totalPrice} kr</h1>
                <span> bokningsavgift 50 kr</span>
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
            <img src={state.dbObj.pic} alt="Pic of the ad" />
            <div className="contentContainer">
              <h1>{state.dbObj.title}</h1>
              <div className="container1">
                <p>{state.dbObj.price[0]} kr/dag</p>
                <p>{state.dbObj.adress}</p>
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
            <MainBtn
              text="Gör en förfrågan"
              onClickFunc={() =>
                setState((prev) => ({ ...prev, showCalendar: true }))
              }
            />
          </>
        )}
      </section>
    </>
  );
};

export default AdPage;
