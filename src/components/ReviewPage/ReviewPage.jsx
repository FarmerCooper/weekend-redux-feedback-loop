import {useSelector} from 'react-redux'

function ReviewPage({feedback}) {

    return (

        <div>
        <p>Feelings: {feedback.feeling}</p>
        <p>Understanding: {feedback.understanding}</p>
        <p>Support: {feedback.support}</p>
        <p>Comments: {feedback.comments}</p>
        <button type="submit">Submit</button>
        </div>
    )
}

export default ReviewPage;