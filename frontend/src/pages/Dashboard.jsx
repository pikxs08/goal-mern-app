import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoalsForm from "../components/GoalsForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  // Get user and goals from redux store
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  // Get user data from local storage and fetch initial data
  useEffect(() => {
    // Log error message if there is an error
    if (isError) {
      toast.error(message);
    }

    // Redirect to login if user is not logged in
    if (!user) {
      navigate("/login");
      return () => {
        dispatch(reset());
      };
    }

    // if new goal is added, fetch goals again
    if (isError || message) {
      setFilter("all");
      dispatch(getGoals());
    }

    // Fetch goals if user is logged in
    if (user) {
      setFilter("all");
      dispatch(getGoals("all"));
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Filter goals by radio input
  const filterGoals = (e) => {
    const filter = e.target.id;
    dispatch(getGoals(filter));
    if (filter === "all") {
      setFilter("all");
    } else if (filter === "completed") {
      setFilter("completed");
    } else if (filter === "in-progress") {
      setFilter("in-progress");
    } else if (filter === "mentor") {
      setFilter("mentor");
    }
  };

  return (
    <>
      <section className="heading">
        {!user?.isMentor ? (
          <>
            <h3>You are signed in as a mentee.</h3>
            <p className="header-body">
              Create a goal below by entering a title and selecting a date by
              which you would like to achieve it by. Because you are a normal
              user, your goals are only visible to Mentors, who will provide
              advice and insights.
            </p>
            <p className="header-body">
              You can also view your goals and delete them if you wish. You can
              also filter your goals by selecting the radio buttons below. Leave
              a comment to ask for help from a mentor and also mark your goal as
              completed when you achieve it. Happy goal setting!
            </p>
          </>
        ) : (
          <>
            <h3>You are signed in as a mentor</h3>

            <p className="header-body">
              As a mentor, you have full access to assist and guide your mentees
              in setting and achieving their goals. Below, you can provide
              advice, collaborate with other mentors, and empower your mentees
              to reach their aspirations. As a mentor, your insights and support
              will be invaluable in guiding them on their journey.
            </p>
            <p className="header-body">
              You can view your mentees' goals and offer guidance. Encourage
              them to delete goals if needed and filter their objectives using
              the radio buttons below. Engage with them by leaving comments and
              celebrate their accomplishments by marking goals as completed.
              Together, let's inspire and empower growth through goal setting!
            </p>
          </>
        )}
      </section>
      <GoalsForm />

      <section className="content">
        <div className="goals">
          <h4>filter by:</h4>

          <div className="goals-filter">
            <div className="form-group checkbox">
              <input
                type="radio"
                id="all"
                name="filter"
                onChange={filterGoals}
                checked={filter === "all"} // Update the checked attribute
              />
              <label htmlFor="all">all goals</label>
            </div>
            <div className="form-group checkbox">
              <input
                type="radio"
                id="completed"
                name="filter"
                onChange={filterGoals}
                checked={filter === "completed"}
              />
              <label htmlFor="completed">completed</label>
            </div>

            <div className="form-group checkbox">
              <input
                type="radio"
                id="in-progress"
                name="filter"
                onChange={filterGoals}
                checked={filter === "in-progress"}
              />
              <label htmlFor="in-progress">in progress</label>
            </div>
            {user?.isMentor && (
              <div className="form-group checkbox">
                <input
                  type="radio"
                  id="mentor"
                  name="filter"
                  onChange={filterGoals}
                  checked={filter === "mentor"}
                />
                <label htmlFor="mentor">My Goals</label>
              </div>
            )}
          </div>
          {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalItem key={goal._id} user={user} goal={goal} />
            ))
          ) : (
            <h3>No goals here...</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
