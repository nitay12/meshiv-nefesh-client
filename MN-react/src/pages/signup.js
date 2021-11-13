import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { Link } from "react-router-dom";
//MUI imports
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core/";

import {
  withStyles,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
//rtl stuff
import { create } from "jss";
import rtl from "jss-rtl";
//Redux imports
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
const styles = {
  form: {
    textAlign: "center",
  },
  textField: {
    textAlign: "right",
    direction: "rtl",
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 10,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      //TODO: Add logo
      <StylesProvider jss={jss}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" className={classes.pageTitle}>
              הרשמה
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="אי-מייל"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="סיסמה"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="אשר סיסמא"
                className={classes.textField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="handle"
                name="handle"
                type="text"
                label="שם משתמש"
                className={classes.textField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                הרשם
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                יש לך כבר משתמש? התחבר <Link to="/login">כאן</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </StylesProvider>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})


export default connect(mapStateToProps,{ signupUser })(withStyles(styles)(signup))
