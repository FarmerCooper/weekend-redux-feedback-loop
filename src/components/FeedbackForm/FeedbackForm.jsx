import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, useHistory } from "react-router-dom";

import ReviewPage from "../ReviewPage/ReviewPage";

function FeedbackForm() {
  let [feedback, setFeedback] = useState({
    feeling: "",
    understanding: "",
    support: "",
    comments: "",
  });

  let buttonOne = document.getElementsByClassName('feeling')

  const dispatch = useDispatch();
  const history = useHistory();

  // These will change a specific input
  // While keeping the rest of the state the same
  const handleFeelingInput = (event) => {
    setFeedback({
      ...feedback,
      feeling: event.target.value,
    });

  };

  const handleUnderInput = (event) => {
    setFeedback({
      ...feedback,
      understanding: event.target.value,
    });

  };

  const handleSupportInput = (event) => {
    setFeedback({
      ...feedback,
      support: event.target.value,
    });

  };

  const handleCommentsInput = (event) => {
    setFeedback({
      ...feedback,
      comments: event.target.value,
    });

  };

  // These functions will send users to the next page
  const handleNextTwo = (event) => {
    history.push('/2')
  }
  const handleNextThree = (event) => {
    history.push('/3')
  }
  const handleNextFour = (event) => {
    history.push('/4')
  }
  const handleNextFive = (event) => {
    history.push('/5')
  }


  // POST data to the DB
  const handleSubmit = (event) => {
    console.log("in handleSubmit");

    event.preventDefault();

    axios
      .post("/form", feedback)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "ADD_FEEDBACK",
          payload: feedback,
        });
      })
      .catch((error) => {
        console.log("Error in POST /form", error);
      });

    // CLEAR Input fields
    setFeedback({ feeling: "", understanding: "", support: "", comments: "" });

    // Send user back to starting page
    history.push('/')
  };

  return (
    <Router>
      <form onSubmit={handleSubmit}>
        <Route path="/" exact>
          <label>
            <input
              placeholder=""
              onChange={handleFeelingInput}
              value={feedback.feeling}
            />
          </label>
          <button onClick={handleNextTwo} type="button">Next</button>
        </Route>
        <Route path="/2" exact>
          <label>
            <input
              placeholder=""
              onChange={handleUnderInput}
              value={feedback.understanding}
            />
          </label>
          <button onClick={handleNextThree} type="button">Next</button>
        </Route>
        <Route path="/3" exact>
          <label>
            <input
              placeholder=""
              onChange={handleSupportInput}
              value={feedback.support}
            />
          </label>
          <button onClick={handleNextFour} type="button">Next</button>
        </Route>
        <Route path="/4" exact>
          <label>
            <input
              placeholder=""
              onChange={handleCommentsInput}
              value={feedback.comments}
            />
          </label>
          <button onClick={handleNextFive} type="button">Next</button>
        </Route>
        <Route path="/5" exact>
          <ReviewPage 
          feedback = {feedback}
          />
        </Route>
      </form>
    </Router>
  );
}

export default FeedbackForm;
