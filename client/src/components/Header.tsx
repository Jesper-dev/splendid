import { useEffect, useState } from "react";
import { usePathname } from "../hooks/urlHook";

export const Header = () => {
  const [title, setTitle] = useState("");
  const path = usePathname();

  console.log("Path in header: ", path);

  const makeTitle = () => {
    const newTitle = path.slice(10);
    setTitle(newTitle);
  };

  const checkPara = () => {
    switch (path) {
      case "/category/Verktyg":
        makeTitle();
        break;
      case "/category/Sport och Fritid":
        makeTitle();
        break;
      default:
        const newTitle = "SPLENDID";
        setTitle(newTitle);
        break;
    }
  };

  useEffect(() => {
    checkPara();
  }, [path]);

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};
