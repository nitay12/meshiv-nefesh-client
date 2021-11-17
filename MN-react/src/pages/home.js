import React, { useEffect } from "react";
// MUI imports
import Grid from "@material-ui/core/grid";
// Components
import Answer from "../components/Answer";
import Profile from "../components/Profile";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { dataSelector } from "../redux/slices/dataSlice";
import { getAllAnswers } from "../redux/actions/rtkDataActions";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAnswers());
  },[]);
  const { answers, loading } = useSelector(dataSelector);
  let recentAnswersMarkup = loading ? (
    <p>loading...</p>
  ) : (
    answers.map((answer) => <Answer key={answer.answerId} answer={answer} />)
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
export default Home;
