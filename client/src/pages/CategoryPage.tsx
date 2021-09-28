import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CheckSlug } from "../api/checkSlug";

const CategoryPage = () => {
  let slug = CheckSlug();
  const history = useHistory();
  useEffect(() => {
    console.log(slug);
  }, [slug]);

  const pushBack = () => {
    history.goBack();
  };
  return (
    <section className="categoryPageContainer">
      <i className="fas fa-chevron-left" onClick={() => pushBack()}></i>
      <h1>{slug}</h1>
    </section>
  );
};

export default CategoryPage;
