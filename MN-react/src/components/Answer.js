import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//My Components
import DeleteAnswer from "../components/DeleteAnswer";
import AnswerDialog from "../components/AnswerDialog";
import MyButton from "../util/MyButton";
// MUI imports
import { withStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Tooltip,
} from "@material-ui/core";
//Icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ChatIcon from "@material-ui/icons/Chat";
// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Redux
import { connect } from "react-redux";
import { confirmAnswer, unconfirmAnswer } from "../redux/actions/dataActions";

const styles = {
  card: {
    position: "relative",
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    alignItems: "center",
  },
  content: {
    marginRight: 10,
  },
  image: {
    minWidth: 50,
    minHeight: 50,
  },
};

class Answer extends Component {
  confirmedAnswer = () => {
    if (
      this.props.user.confirms &&
      this.props.user.confirms.find(
        (confirm) => confirm.answerId === this.props.answer.answerId
      )
    )
      return true;
    else return false;
  };
  confirmAnswer = () => {
    this.props.confirmAnswer(this.props.answer.answerId);
  };
  unconfirmAnswer = () => {
    this.props.unconfirmAnswer(this.props.answer.answerId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      answer: {
        body,
        createdAt,
        userImage,
        userHandle,
        answerId,
        confirmCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    // Confirm Button
    const confirmButton = !authenticated ? (
      <MyButton tip="התחבר כדי לאשר">
        <Link to="/login">
          <CheckCircleOutlineIcon color="primary" />
        </Link>
      </MyButton>
    ) : this.confirmedAnswer() ? (
      <MyButton tip="בטל אישור" onClick={this.unconfirmAnswer}>
        <CheckCircleIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="אשר" onClick={this.confirmAnswer}>
        <CheckCircleOutlineIcon color="primary" />
      </MyButton>
    );
    // Delete Button
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteAnswer answerId={answerId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia>
          <Tooltip title={userHandle}>
            <Avatar
              className={classes.image}
              src={userImage}
              component={Link}
              to={`/users/${userHandle}`}
            />
          </Tooltip>
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body1"> {body}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          {confirmButton}
          <span>{confirmCount} אישורים </span>
          <MyButton tip="תגובות">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} תגובות</span>
        </CardContent>
        <AnswerDialog answerId={answerId} userHandle={userHandle} />
      </Card>
    );
  }
}

Answer.propTypes = {
  user: PropTypes.object,
  answer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  confirmAnswer: PropTypes.func.isRequired,
  unconfirmAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionToProps = {
  confirmAnswer,
  unconfirmAnswer,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Answer));
