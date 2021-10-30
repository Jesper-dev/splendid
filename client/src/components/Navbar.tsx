import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePathname } from "../hooks/urlHook";

export const Navbar = () => {
  const [isTrue, setIsTrue] = useState(false);
  const path = usePathname();

  //Hide or shows the navbar
  useEffect(() => {
    //Hide or shows the navbar
    switch (path) {
      case "/add":
        setIsTrue(true);
        break;
      case "/login":
        setIsTrue(true);
        break;
      case "/signup":
        setIsTrue(true);
        break;
      default:
        setIsTrue(false);
        break;
    }
    if (path.includes("/ad") || path.includes("/complete")) {
      setIsTrue(true);
    } else if (path.includes("/pay")) {
      setIsTrue(true);
    }
  }, [path]);

  return (
    <>
      {isTrue ? null : (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/discover">Discover</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
