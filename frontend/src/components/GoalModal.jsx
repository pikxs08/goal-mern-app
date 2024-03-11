import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import {
  updateGoal,
  addComment,
  fetchLatestComments,
} from "../features/goals/goalSlice";

function GoalModal({ goal, closeModal }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(goal.text);
  const [targetDate, setTargetDate] = useState(goal.targetDate);
  const [needsHelp, setNeedsHelp] = useState(goal.needsHelp);
  const [completed, setCompleted] = useState(goal.completed);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update goal with form data
    dispatch(
      updateGoal({ id: goal._id, text, targetDate, needsHelp, completed })
    );
    closeModal();
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add comment
    dispatch(addComment({ id: goal._id, text: commentText }))
      .then(() => {
        // Dispatch action to fetch latest comments
        dispatch(fetchLatestComments());
        // Clear comment input
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <h2>Edit Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="text" value={text} onChange={handleChange} />
        </label>
        <label>
          Target Date:
          <input
            type="date"
            name="targetDate"
            value={targetDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Needs Help:
          <input
            type="checkbox"
            name="needsHelp"
            checked={needsHelp}
            onChange={handleChange}
          />
        </label>
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>

      {/* Comment Section */}
      <h2>Comments</h2>
      <ul>
        {goal.comments.map((comment, index) => (
          <li key={index}>
            <p>User: {comment.user.name}</p>
            <p>Text: {comment.text}</p>
            <p>Created At: {comment.createdAt}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="comment"
          value={commentText}
          onChange={handleCommentChange}
        />
        <button type="submit">Submit Comment</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}

export default GoalModal;
