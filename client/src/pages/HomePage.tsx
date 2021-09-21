import { useHistory } from "react-router-dom";

const HomePage = () => {
  let history = useHistory();
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
