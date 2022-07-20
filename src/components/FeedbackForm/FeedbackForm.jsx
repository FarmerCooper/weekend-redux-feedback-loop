import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, useHistory } from "react-router-dom";

import ReviewPage from "../ReviewPage/ReviewPage";
import '../App/App.css'

function FeedbackForm() {
  let [feedback, setFeedback] = useState({
    feeling: "",
    understanding: "",
    support: "",
    comments: "",
  });

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
  // Prevent users from entering an invalid input
  const handleNextTwo = (event) => {
    if (feedback.feeling == 1 
      || feedback.feeling == 2 
      || feedback.feeling == 3 
      || feedback.feeling == 4 
      || feedback.feeling == 5) {
      history.push('/2')
    } else {
      return alert('invalid input')
    }
  }
  const handleNextThree = (event) => {
    if (feedback.understanding == 1 
      || feedback.understanding == 2 
      || feedback.understanding == 3 
      || feedback.understanding == 4 
      || feedback.understanding == 5) {
      history.push('/3')
    } else {
      return alert('invalid input')
    }
  }
  const handleNextFour = (event) => {
    if (feedback.support == 1 
      || feedback.support == 2 
      || feedback.support == 3 
      || feedback.support == 4 
      || feedback.support == 5) {
      history.push('/4')
    } else {
      return alert('invalid input')
    }
  }
  const handleNextFive = (event) => {
      history.push('/5')
  }

  // Take the user back a page
  const takeBackToThree = () => {
    history.push('/3')
  }
  const takeBackToTwo = () => {
    history.push('/2')
  }
  const takeBackToOne = () => {
    history.push('/')
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
          <div>From a scale of 1-5, 5 being great, how do you feel?</div>
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
          <div>From a scale of 1-5, what is your comprehension level?</div>
          <button onClick={takeBackToOne} type="button">Back</button>
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
        <div>From a scale of 1-5, how supported do you feel?</div>
        <button onClick={takeBackToTwo} type="button">Back</button>
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
        <div>Do you have any comments for us?</div>
        <button onClick={takeBackToThree} type="button">Back</button>
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
