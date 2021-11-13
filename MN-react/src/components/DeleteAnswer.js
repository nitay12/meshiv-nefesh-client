import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// MUI imports
import { withStyles } from "@material-ui/styles";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
// Redux
import { connect } from "react-redux";
import { deleteAnswer } from "../redux/actions/dataActions";

const styles = {
    deleteButton:{
        position: "absolute",
        right: "80%"
    }
};

class DeleteAnswer extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    deleteAnswer = () => {
        this.props.deleteAnswer(this.props.answerId);
        this.setState({open: false});
    };
  render() {
    const { classes } = this.props
    return (
        <Fragment>
        <MyButton
          tip="מחק תשובה"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
          >
              <DeleteOutline color="secondary"/>
        </MyButton>
        <Dialog
            open = {this.state.open}
            onClose = {this.handleClose}
            fullWidth
            maxWidth = 'sm'
        >
            <DialogTitle>
                האם אתה בטוח שברצונך למחוק תשובה זו?
            </DialogTitle>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    בטל    
                </Button> 
                <Button onClick={this.deleteAnswer} color="secondary">
                    מחק    
                </Button> 
            </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteAnswer.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  answerId: PropTypes.string.isRequired,
};

export default connect(
    null,
    { deleteAnswer }
    )(withStyles(styles)(DeleteAnswer));
