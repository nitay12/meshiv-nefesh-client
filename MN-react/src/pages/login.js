import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
// MUI imports
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core/";
import {
  StylesProvider,
  jssPreset,
  withStyles,
} from "@material-ui/core/styles";
//RTL stuff
import { create } from "jss";
import rtl from "jss-rtl";
// Redux imports
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

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

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      //TODO: Add logo
      <StylesProvider jss={jss}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" className={classes.pageTitle}>
              כניסה
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
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.password}
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
                הכנס
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </StylesProvider>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
