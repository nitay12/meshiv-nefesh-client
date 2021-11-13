import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
//MUI imports
import { AppBar, Toolbar, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
// Redux
import { connect } from "react-redux";
import PostAnswer from "./PostAnswer";
export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {!authenticated ? (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                {" "}
                הכנס
              </Button>
              <Button color="inherit" component={Link} to="/">
                {" "}
                דף הבית
              </Button>
              <Button color="inherit" component={Link} to="signup">
                {" "}
                הרשם
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <PostAnswer/>
              <Link to="/">
                <MyButton tip="דף הבית">
                  <HomeIcon />
                </MyButton>
              </Link>

              <MyButton tip="התראות">
                <Notifications />
              </MyButton>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
