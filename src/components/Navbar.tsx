import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/Discover">Discover</Link>
        </li>
        <li>
          <Link to="/Add">Add</Link>
        </li>
      </ul>
    </nav>
  );
};
