import { useEffect, useState, useCallback } from "react";
import { usePathname } from "../hooks/urlHook";

export const Header = () => {
  const [state, setState] = useState<{ title: string; isTrue: boolean }>({
    title: "",
    isTrue: false,
  });
  const path = usePathname();

  const makeTitle = useCallback(() => {
    const newTitle = path.slice(10);
    setState((prev) => ({ ...prev, title: newTitle }));
  }, [path]);

  //Changes the headers title or hide / shows it
  useEffect(() => {
    switch (path) {
      case "/category/Verktyg":
        makeTitle();
        break;
      case "/category/Sport och Fritid":
        makeTitle();
        break;
      case "/hyresvillkor":
        let hyresvillkor = "Hyresvillkor";
        setState((prev) => ({ ...prev, title: hyresvillkor }));
        break;
      case "/add":
        let title = "lägg upp annons";
        setState((prev) => ({ ...prev, title: title }));
        break;
      default:
        const newTitle = "SPLENDID";
        setState((prev) => ({ ...prev, title: newTitle }));
        break;
    }
    if (path.includes("/ad")) {
      setState((prev) => ({ ...prev, isTrue: true }));
    } else if (path.includes("/pay")) {
      setState((prev) => ({ ...prev, isTrue: true }));
    } else {
      setState((prev) => ({ ...prev, isTrue: false }));
    }
  }, [path, makeTitle]);

  return (
    <>
      {state.isTrue ? null : (
        <header>
          <h1>{state.title}</h1>
        </header>
      )}
    </>
  );
};
