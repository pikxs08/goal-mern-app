import React, { useState } from "react";
// import Modal from "react-modal";
import { FaCommentDots } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { updateGoal, addComment, getGoals } from "../features/goals/goalSlice";
import { IoIosClose } from "react-icons/io";

// Setting Modal Element - When view is clicked it opens
// Modal.setAppElement("#root");

function GoalModal({ goal, user, closeModal }) {
  const dispatch = useDispatch();

  // State to hold form data
  const [text, setText] = useState(goal.text);
  const [needsHelp, setNeedsHelp] = useState(goal.needsHelp);
  const [completed, setCompleted] = useState(goal.completed);
  const [targetDate, setTargetDate] = useState(
    new Date(goal.targetDate).toISOString().split("T")[0]
  );

  // Get user name
  const userName = user.name;

  // Get goal comments
  const comments = goal.comments.map((comment) => comment.user);
  console.log(comments);

  // Function to calculate days left before target date
  const daysLeft = (targetDate) => {
    const date1 = new Date(targetDate);
    const date2 = new Date();
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // State to hold comment text
  const [commentText, setCommentText] = useState("");

  // Function to handle comment input change
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  // Function to handle form input change
  const handleChange = (e) => {
    switch (e.target.name) {
      case "text":
        setText(e.target.value);
        break;
      case "targetDate":
        setTargetDate(e.target.value);
        break;
      case "needsHelp":
        setNeedsHelp(e.target.checked);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch action to add comment
      await handleCommentSubmit(e);

      // Clear comment input
      setCommentText("");

      // Dispatch action to update goal with form data
      await dispatch(
        updateGoal({ id: goal._id, text, targetDate, needsHelp, completed })
      );

      // Fetch updated goal
      await dispatch(getGoals(goal._id));
    } catch (error) {
      console.error("Error updating goal and adding comment:", error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add comment
    console.log("Payload:", goal._id, commentText, userName);

    dispatch(addComment({ id: goal._id, text: commentText, name: userName }))
      .then(() => {
        // Clear comment input
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch action to update goal with form data
      await dispatch(
        updateGoal({ id: goal._id, text, targetDate, needsHelp, completed })
      );
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="modal scale-in-center " isOpen={true}>
      <button className="btn btn-close" onClick={closeModal}>
        <IoIosClose />
      </button>
      <div className="goal-info-cont">
        <div className="info-cont">
          <div className="goal-info">
            <h2 style={{ fontWeight: "800", fontSize: "2rem" }}>{goal.text}</h2>
            <p>
              <strong>Due date:</strong>{" "}
              {new Date(goal.targetDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Days left:</strong> {daysLeft(goal.targetDate)} days
            </p>
            <div className="goal-status">
              <p>
                <strong>Status:</strong>
              </p>
              {goal.completed ? (
                <p
                  className="pill pill-completed"
                  style={{ width: "fit-content" }}
                >
                  completed
                </p>
              ) : (
                <p
                  className="pill pill-pending"
                  style={{ width: "fit-content" }}
                >
                  in progress
                </p>
              )}
            </div>
          </div>
          <div className="goal-comments">
            <h3>Comments:</h3>
            <ul className="comments-cont">
              {goal.comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  <div className="comment-header">
                    <FaCommentDots />
                    <p className="comment-user">{comment.name.split(" ")[0]}</p>
                    <p className="comment-date pill pill-pending">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="comment-body">{comment.text}</p>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="comment"
                  className="form-control"
                  value={commentText}
                  placeholder="Add a comment here..."
                  onChange={handleCommentChange}
                />
                <button className="btn" type="submit">
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Goal Section */}
      <h3>Edit Goal</h3>
      <form onSubmit={handleGoalSubmit} className="edit-modal-form">
        <div className="form-group">
          <label>
            Title:
            <input
              type="text"
              name="text"
              className="form-control"
              value={text}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Target Date:
            <input
              type="date"
              name="targetDate"
              className="form-control"
              value={targetDate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group modal-checkbox">
          <div className="checkbox ">
            <label>Mark for Help:</label>
            <input
              type="checkbox"
              name="needsHelp"
              id="needsHelp"
              className="form-control"
              checked={needsHelp}
              onChange={handleChange}
            />
            <label>Mark as completed:</label>
            <input
              type="checkbox"
              name="completed"
              id="completed"
              className="form-control"
              checked={completed}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalModal;
