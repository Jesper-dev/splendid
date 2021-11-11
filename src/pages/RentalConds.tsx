import { useHistory } from "react-router-dom";

const RentalConds = () => {
  const history = useHistory();
  return (
    <section className="rentalcondsContainer">
      <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries.
      </p>
    </section>
  );
};

export default RentalConds;
