import React from "react";
import HomePage from "./pages/HomePage";
import Discover from "./pages/Discover";
import CategoryPage from "./pages/CategoryPage";
import AdPage from "./pages/AdPage";
import RentAdPage from "./pages/RentAdPage";
import PayPage from "./pages/PayPage";
import RentalConds from "./pages/RentalConds";
import CreateAd from "./pages/CreateAd";
import CreateAdComplete from "./pages/CreateAdComplete";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Navbar />
        <main>
          <Switch>
            {/* Våra routes */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/category/:slug" component={CategoryPage} />
            <Route exact path="/ad/:slug" component={AdPage} />
            <Route exact path="/rent" component={RentAdPage} />
            <Route exact path="/pay/:slug" component={PayPage} />
            <Route exact path="/hyresvillkor" component={RentalConds} />
            <Route exact path="/add" component={CreateAd} />
            <Route exact path="/complete" component={CreateAdComplete} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
