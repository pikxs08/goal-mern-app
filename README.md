# Goal Tracker App

## Software Requirements Documentation

### System Architecture

The Goal Tracker App is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This choice of architecture was motivated by several factors:

- **Scalability**: The MERN stack is highly scalable, allowing the application to handle a growing user base efficiently.
- **Developer-Friendly**: Each component of the MERN stack has a large and active community, providing extensive documentation and support.
- **Full-Stack JavaScript**: Using JavaScript throughout the stack streamlines development and ensures consistency in codebase.
- **Flexibility**: The MERN stack offers flexibility in terms of deployment options, allowing deployment on platforms like Heroku.

The front-end of the application is created using Create React App (CRA). Styled-components library has been used for styling the app, providing a convenient way to manage styles within React components. This choice was motivated by the ease of use and the ability to create reusable and customizable components.

### System Requirements Specification

#### Overview

The Goal Tracker App is designed to facilitate goal setting and tracking within a community of mentors and users. It allows users to create goals, track their progress, and receive support and insights from mentors. The primary users of the application are individuals who want to set and achieve personal or professional goals with the assistance of mentors.

#### User Stories

1. As a user, I want to be able to sign up for an account so that I can access the Goal Tracker App.
2. As a user, I want to be able to log in to my account securely.
3. As a user, I want to be able to create a new goal with a title and target completion date.
4. As a user, I want to be able to view all my goals and their status (complete or in progress).
5. As a user, I want to be able to edit and delete my goals.
6. As a user, I want to be able to mark a goal as needing help so that mentors can provide assistance.
7. As a mentor, I want to be able to see all goals created by users who need assistance.
8. As a mentor, I want to be able to comment on and track the progress of goals created by users.
9. As a mentor, I want to be able to set my own goals and track their progress.

#### Competitor Analysis

There are several goal tracking applications available in the market, such as Trello, Asana, and Todoist. However, the Goal Tracker App differentiates itself by focusing on simplicity and community-driven support:

- **Simplicity**: The Goal Tracker App offers a streamlined interface with essential features, making it easy for users to set and track their goals without unnecessary complexity.
- **Community Support**: Unlike some existing applications, the Goal Tracker App emphasizes community support, allowing users to connect with mentors and receive guidance and insights to achieve their goals effectively.
- **Mentorship**: The inclusion of mentorship functionality sets the Goal Tracker App apart from many other goal tracking applications, providing users with valuable support and motivation from experienced individuals.

### Functional Requirements

1. User authentication: Users should be able to sign up and log in securely.
2. Goal management: Users should be able to create, edit, delete, and mark goals as needing help.
3. Mentor functionality: Mentors should be able to view and comment on goals created by users who need assistance, as well as set and track their own goals.
4. Filtering: Users should be able to filter goals based on completion status and ownership (all goals, completed goals, in-progress goals, own goals).

### Non-Functional Requirements

1. Security: The application should securely handle user authentication and protect user data.
2. Performance: The application should be responsive and performant, even with a large number of users and goals.
3. Usability: The user interface should be intuitive and easy to navigate, promoting user engagement and adoption.
4. Scalability: The application should be able to handle a growing user base and scale resources accordingly.
5. Reliability: The application should be reliable, with minimal downtime and robust error handling.

### Wireframe

[Wireframe Link](https://www.figma.com/file/KQrs87k47exr5sSFPpf9CZ/Goals-App?type=design&node-id=0%3A1&mode=design&t=21wC5uoIK7aKAGdv-1)

### User Case Stories

1. John, a software engineer, wants to set a goal to learn a new programming language within three months. He signs up for the Goal Tracker App, creates a new goal titled "Learn Python" with a target completion date, and tracks his progress over time.
2. Sarah, a fitness enthusiast, wants to lose weight and improve her overall health. She creates a new goal in the Goal Tracker App to exercise regularly and maintain a healthy diet, receiving support and encouragement from mentors in the community.
3. Mark, a seasoned professional in his field, decides to become a mentor on the Goal Tracker App to share his expertise and support others in achieving their goals. He sets his own goals and provides guidance and feedback to users who need assistance.
4. Emily, a college student, wants to improve her time management skills to balance her studies and extracurricular activities effectively. She uses the Goal Tracker App to set specific goals and track her progress, receiving advice from mentors on prioritization and organization.
5. David, a small business owner, wants to expand his customer base and increase revenue. He joins the Goal Tracker App to set strategic business goals and receives insights from mentors on marketing strategies and customer acquisition.

### Standing Out from Competitors

To make the Goal Tracker App stand out from competitors, several strategies will be implemented:

- **Focus on Community**: Emphasizing the community aspect of the app, fostering connections between users and mentors to provide valuable support and motivation.
- **Simplicity**: Keeping the interface clean and intuitive, with essential features that are easy to use and understand.
- **Personalization**: Offering personalized recommendations and insights based on user goals and progress, enhancing the user experience and engagement.
- **Gamification**: Implementing gamification elements such as achievements and milestones to encourage user participation and goal completion.

## How to Use the App

To use the Goal Tracker App, follow these steps:

1. Clone the repository from [GitHub](https://github.com/pikxs08/goal-mern-app.git) to your local machine.
2. Navigate to the project directory in your terminal.
3. Create an `.env` file in the root directory with the following environment variables:

```plaintext
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb+srv://pieter:Cosmo%402023@cosmocluster.9a5knqz.mongodb.net/goals?retryWrites=true&w=majority
JWT_SECRET=abc123
```

4. Run `npm install` to install dependencies.
5. Run `npm run start` to start the development server concurrently for the backend and frontend.
6. Access the application in your web browser at `http://localhost:8000`.

## Security Measures

- User authentication with JWT tokens to prevent unauthorized access.
- Password hashing using Bcrypt to secure user passwords.
- Implementation of authentication middleware to protect routes from unauthorized users.

## Third-Party APIs

No third-party APIs are used in the Goal Tracker App.

## Deployment

The Goal Tracker App is deployed on Heroku. The backend and frontend are deployed together for simplicity and ease of management. Heroku configuration variables are set up for environment-specific variables such as JWT secret and MongoDB URI.

[Deployed App Link](https://goals-mern-app-93ea3f418a1f.herokuapp.com/login)
