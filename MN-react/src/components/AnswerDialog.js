import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
// MUI imports
import { withStyles } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { getAnswer } from "../redux/actions/dataActions";

const styles = {
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
  dialogContent: {
    padding:20
  },
  closeButton: {
    position: "absolute",
    right: "90%",
  },
  expandButton: {
    position: "absolute",
    right: "90%"
  },
  spinnerContainer: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50
  }
};

export class AnswerDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getAnswer(this.props.answerId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      answer: {
        answerId,
        body,
        createdAt,
        confirmCount,
        commentCount,
        userImage,
        userHandle,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerContainer}>
        <CircularProgress size={200} thickness={2}/>
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            varient="h5"
            to={`/answers/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="הרחב תשובה"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore />
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

          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AnswerDialog.propTypes = {
  getAnswer: PropTypes.func.isRequired,
  answerId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  ansewr: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  answer: state.data.answer,
  UI: state.UI,
});

export default connect(mapStateToProps, { getAnswer })(
  withStyles(styles)(AnswerDialog)
);
