import { Link, BrowserRouter as Router } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/Discover">
          {" "}
          <li>Discover</li>
        </Link>
        <Link to="/Add">
          <li>Add</li>
        </Link>
      </ul>
    </nav>
  );
};
