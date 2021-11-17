import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles/";
import jwtDecode from "jwt-decode";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types"
import { logoutUser, getUserData } from "./redux/actions/userActions"
// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
//Pages
import login from "./pages/login";
import signup from "./pages/signup";
import Home from "./pages/home";

const theme = createMuiTheme({
  direction: "rtl",
  form: {
    textAlign: "center",
  },
});
const token = localStorage.FBIdToken;
if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.herf = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
