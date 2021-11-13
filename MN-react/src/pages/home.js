import React, { Component } from "react";
import { PropTypes } from "prop-types";
// MUI imports
import Grid from "@material-ui/core/grid";
// Components
import Answer from "../components/Answer";
import Profile from "../components/Profile";
// Redux
import { connect } from "react-redux";
import { getAnswers } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getAnswers()
  }
  render() {
    const { answers, loading} = this.props.data
    let recentAnswersMarkup = !loading ? (
      answers.map((answer) => (
        <Answer key={answer.answerId} answer={answer} />)
      )
    ) : (
      <p>loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={6} xs={12}>
          {recentAnswersMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {getAnswers})(home);
