import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
// Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";
// MUI
import { withStyles, Grid } from "@material-ui/core/";
import MuiLink from "@material-ui/core/Link";
import {
  Button,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = {
  paper: {
    padding: 40,
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 100,
    width: 100,
  },
};

class Profile extends Component {
  handleImageChange = (e) => {
    const image = e.target.files[0];
    const fd = new FormData();
    fd.append("image", image, image.name);
    this.props.uploadImage(fd);
  };
  handleEditPic = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl },
        loading,
        authenticated,
      },
    } = this.props;

    let profilMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item sm />
            <Grid item sm direction="column">
              <Grid item sm>
                <Badge
                  badgeContent={
                    <MyButton
                      tip="שנה תמונת פרופיל"
                      placement="right"
                      onClick={this.handleEditPic}
                      btnClassName="button"
                    >
                      <EditIcon color="secondary" />
                    </MyButton>
                  }
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    className={classes.avatar}
                    src={imageUrl}
                    title="Profile image"
                    component={Link}
                    to={`/users/${handle}`}
                  />
                  <input
                    type="file"
                    id="imageInput"
                    onChange={this.handleImageChange}
                    hidden="hidden"
                  />
                </Badge>
              </Grid>
              <Grid item sm>
                <MuiLink
                  component={Link}
                  to={`/users/${handle}`}
                  color="primary"
                  variant="body"
                >
                  {handle}
                </MuiLink>
                <MyButton tip="התנתק" placement="bottom" onClick={this.handleLogout}>
                    <KeyboardReturn color="primary" />
                </MyButton>
              </Grid>
            </Grid>
            <Grid item sm />
          </Grid>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            אינך מחובר
          </Typography>
          <div className={classes.buttons}>
            <Button
              varient="contained"
              color="primary"
              component={Link}
              to={`/login`}
            >
              הכנס
            </Button>
            <Button
              varient="contained"
              color="secondary"
              component={Link}
              to={`/login`}
            >
              הרשם
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading....</p>
    );

    return profilMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile));
