import React from "react";
import HomePage from "./pages/HomePage";
import Discover from "./pages/Discover";
import CreateAdd from "./pages/CreateAdd";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Discover" component={Discover} />
            <Route exact path="/Add" component={CreateAdd} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
