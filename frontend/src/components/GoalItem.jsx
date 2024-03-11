import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaTrash } from "react-icons/fa";
import GoalModal from "./GoalModal";
import { IoIosAlert } from "react-icons/io";
import { SlUser, SlUserFollow } from "react-icons/sl";

function GoalItem({ user, goal }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to calculate days left before target date
  const daysLeft = (targetDate) => {
    const date1 = new Date(targetDate);
    const date2 = new Date();
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to handle opening the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Check if user exists and is not null before accessing its properties
  const isMentor = user && user.isMentor;

  return (
    <>
      {modalIsOpen && (
        <GoalModal goal={goal} user={user} closeModal={closeModal} />
      )}
      <div className="goal-item">
        <div className="goal-item-inner">
          {goal.needsHelp ? (
            <IoIosAlert className="help" />
          ) : isMentor && user._id === goal.user ? (
            <SlUserFollow style={{ height: "20px", width: "20px" }} />
          ) : (
            <SlUser style={{ height: "20px", width: "20px" }} />
          )}
          <h2 className="goal-item-title">{goal.text}</h2>
          <p className="goal-item-days">
            {daysLeft(goal.targetDate)} days left
          </p>
          {goal.completed ? (
            <p className="pill pill-completed">completed</p>
          ) : (
            <p className="pill pill-pending">in progress</p>
          )}
          <button className="btn btn-view" onClick={openModal}>
            view
          </button>
          <FaTrash
            className="trash"
            onClick={() => dispatch(deleteGoal(goal._id))}
          />
        </div>
      </div>
    </>
  );
}

export default GoalItem;
