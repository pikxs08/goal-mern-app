import { useDispatch } from "react-redux";
import { useState } from "react";
import { createGoal } from "../features/goals/goalSlice";

function GoalsForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            id="text"
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-block"
            onSubmit={onSubmit}
            type="submit"
            style={{ cursor: "pointer" }}
          >
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalsForm;
