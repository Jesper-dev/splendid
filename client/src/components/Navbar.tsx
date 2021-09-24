import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePathname } from "../hooks/urlHook";

export const Navbar = () => {
  const isTrue = useRef(false);
  const path = usePathname();

  useEffect(() => {
    if (path === "/add") {
      isTrue.current = false;
    } else {
      isTrue.current = true;
    }
  }, [path]);

  return (
    <>
      {isTrue.current ? null : (
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
