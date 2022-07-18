import axios from 'axios';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

function FeedbackForm() {

    let [feedback, setFeedback] = useState({feeling: '', understanding: '', support: '', comments: ''});

    const dispatch = useDispatch();

    // These will change a specific input
    // While keeping the rest of the state the same
    const handleFeelingInput = (event) => {
        setFeedback({
            ...feedback,
            feeling: event.target.value,
        });
    }

    const handleUnderInput = (event) => {
        setFeedback({
            ...feedback,
            understanding: event.target.value,
        });
    }

    const handleSupportInput = (event) => {
        setFeedback({
            ...feedback,
            support: event.target.value,
        });
    }

    const handleCommentsInput = (event) => {
        setFeedback({
            ...feedback,
            comments: event.target.value,
        });
    }

    // POST data to the DB
    const handleSubmit = (event) => {
        console.log('in handleSubmit');

        event.preventDefault();

        axios.post('/form', {feeling, understanding, support, comments})
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'ADD_FEEDBACK',
                    payload: {feeling, understanding, support, comments}
                })
            })
            .catch((error) => {
                console.log('Error in POST /form', error);
            })
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          placeholder=""
          onChange={handleFeelingInput}
        />
      </label>
      <label>
        <input
          placeholder=""
          onChange={handleUnderInput}
        />
      </label>
      <label>
        <input
          placeholder=""
          onChange={handleSupportInput}
        />
      </label>
      <label>
        <input
          placeholder=""
          onChange={handleCommentsInput}
        />
      </label>
      <button type="submit">NEXT</button>
    </form>
  );
}

export default FeedbackForm;
