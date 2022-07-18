import {useSelector} from 'react-redux'

function ReviewPage() {

    const feedback = useSelector(store => store.formList)

    return (
        <div>
        <p>Feelings: {feedback.feeling}</p>
        <p>Understanding: {feedback.understanding}</p>
        <p>Support: {feedback.support}</p>
        <p>Comments: {feedback.comments}</p>
        </div>
    )
}

export default ReviewPage;