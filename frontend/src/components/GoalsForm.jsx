import { useDispatch } from "react-redux";
import { useState } from "react";
import { createGoal } from "../features/goals/goalSlice";
import { toast } from "react-toastify";

function GoalsForm() {
  const [text, setText] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    // Ensure data is not pushed if empty
    if (text !== "" && targetDate !== "") {
      dispatch(createGoal({ text, targetDate }));
      toast.success("New goal successfully been added.");
      setText("");
      setTargetDate("");
    } else {
      toast.error("Please fill in title and date");
    }
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal title</label>
          <input
            type="text"
            id="text"
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetDate">When will this goal be achieved?</label>
          <input
            type="date"
            id="targetDate"
            value={targetDate}
            name="targetDate"
            onChange={(e) => setTargetDate(e.target.value)}
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
