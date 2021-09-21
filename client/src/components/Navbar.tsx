import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const isTrue = useRef(false);

  useEffect(() => {
    console.log();
    if (window.location.pathname === "/add") {
      isTrue.current = true;
    }
  }, [window.location.pathname]);

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
