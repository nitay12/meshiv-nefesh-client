import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// MUI imports
import { withStyles, jssPreset, StylesProvider } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux
import { connect } from "react-redux";
import { postAnswer, clearErrors } from "../redux/actions/dataActions";
// RTL stuff
import { create } from "jss";
import rtl from "jss-rtl";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const styles = {
  submitButton: {
    position: "relative",
    float: "left",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    right: "91%",
    top: "6%",
  },
    textField: {
    textAlign: "right",
    direction: "rtl",
    margin: "10px auto 10px auto",
  },
};

class PostAnswer extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      })
    };
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({
        body:'',
        errors:{}
      })
    }
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors()
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postAnswer({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <StylesProvider jss={jss}>
        <MyButton onClick={this.handleOpen} tip="הוסף תשובה">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="סגור"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>הוסף תשובה חדשה</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="תשובה"
                multiline
                rows="3"
                placeholder="הכנס כאן את התשובה"
                error={errors.body ? true : false}
                helperText={errors.answer}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                אישור
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </StylesProvider>
    );
  }
}

PostAnswer.propTypes = {
  postAnswer: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postAnswer, clearErrors })(
  withStyles(styles)(PostAnswer)
);
