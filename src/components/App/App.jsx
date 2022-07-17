import React, {useEffect} from "react";
import axios from "axios";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

// components
import AdminView from "../AdminView/AdminView";

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>Don't forget it!</h4>
        </header>
        <Route path="/admin" exact>
          <AdminView />
        </Route>
      </div>
    </Router>
  );
}

export default App;
