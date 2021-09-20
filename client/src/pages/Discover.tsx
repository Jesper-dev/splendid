import { CategoryCard } from "../components/discover/CategoryCard";

const Discover = () => {
  const categoryTexts = ["Sport och Fritid", "Verktyg"];
  return (
    <>
      <section className="categoriesContainer">
        <h3>Kategorier</h3>
        {categoryTexts.map((item) => {
          return <CategoryCard text={item} />;
        })}
      </section>
    </>
  );
};

export default Discover;
