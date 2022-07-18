import {useSelector} from 'react-redux';

function AdminView() {

    const feedbackList = useSelector(store => store.feedbackList)

  return (
    <>
    
      <div>
        <p>Feedback Results</p>
      </div>

      <div>
        <table>
          <thead>
            <tr>
            <th>Feeling</th>
            <th>Comprehension</th>
            <th>Support</th>
            <th>Comments</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => {
              return (
                <tr key={feedback.id}>
                  <td>{feedback.feeling}</td>
                  <td>{feedback.understanding}</td>
                  <td>{feedback.support}</td>
                  <td>{feedback.comments}</td>
                  <td><button>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default AdminView;
