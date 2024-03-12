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
    // Perform the HTTP GET request to fetch goals
    const res = await request(app).post("/api/users/login").send({
      email: "pieter@gmail.com",
      password: "test123",
    });

    // Assert the response
    expect(res.statusCode).toEqual(201);

    // save snapshot
    expect(res.body).toMatchSnapshot();
  });
});
