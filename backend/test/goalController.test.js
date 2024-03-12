const request = require("supertest");
const app = require("../server");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// import generate auth token
const { protect } = require("../middleware/authMiddleware");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// frontend/src/App.test.js

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("POST /api/users/login", () => {
  it("Should return user token", async () => {
    // Mock a user object for the request
    // const user = new User({
    //   _id: "user123",
    //   name: "John Doe",
    //   email: "john@example.com",
    //   isMentor: false, // Assuming the user is not a mentor
    // });
    // Mock goals data
    // const goals = [
    //   {
    //     _id: "goal123",
    //     text: "Test goal",
    //     targetDate: new Date(),
    //     user: "user123", // User ID
    //     comments: [],
    //     completed: false,
    //     needsHelp: false,
    //   },
    // ];
    // Mock the find method of the Goal model
    // Goal.find = jest.fn().mockResolvedValue(goals);

    // Perform the HTTP GET request to fetch goals
    const res = await request(app).post("/api/users/login").send({
      //   name: "Shane",
      email: "shane@gmail.com",
      password: "test123",
      //   isMentor: false,
    });
    //   .get("/api/goals")
    //   .set("Authorization", `Bearer ${user.protect()}`); // Add authorization header

    // Assert the response
    expect(res.statusCode).toEqual(201);
    // expect(res.body.length).toEqual(1);
    // expect(res.body[0].text).toEqual("Test goal");
    // Add more assertions as needed
  });
});
