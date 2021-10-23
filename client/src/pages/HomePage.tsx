import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchDb } from "../redux/dbSlice";

const HomePage = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const fetchDB = useCallback(() => {
    //http://localhost:5000/api/ads/get
    //https://splendidsrv.herokuapp.com/api/ads/get
    //Fetching data from API
    axios
      .post("https://splendidsrv.herokuapp.com/api/ads/all")
      .then((res) => {
        dispatch(fetchDb(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    fetchDB();
  }, [fetchDB]);

  return (
    <>
      <section className="homepageContainer">
        <div className="textContainer">
          <h2>Välkommen till Splendid!</h2>
          <p>
            Om du vill hyra prylar så har du kommit rätt. Allt du behöver tänka
            på är vad du vill hyra så sköter vi resten. Du kan även hyra ut.
          </p>
        </div>
        <button
          className="homepageBtn"
          onClick={() => history.push("/discover")}
        >
          Börja leta
        </button>
      </section>
    </>
  );
};

export default HomePage;
