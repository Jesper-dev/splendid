import { MainBtn } from "../components/MainBtn";
import { useHistory } from "react-router-dom";

const CreateAdComplete = () => {
  let history = useHistory();

  return (
    <section className="addCompleteContainer">
      <div className="textContainer">
        <h1>Det här var ju Splendid!</h1>
        <p>
          Nu finns din produkt uppe för uthryning. En god gärning för miljön.
          Tack!
        </p>
      </div>
      <MainBtn
        text={"Ta mig hem"}
        onClickFunc={() => history.push("/discover")}
      />
    </section>
  );
};

export default CreateAdComplete;
