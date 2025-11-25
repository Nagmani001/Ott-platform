import axios from "axios";
import { describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

describe("/POST signup", () => {
  it("should respond with invalid inputs on sending invald email", async () => {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email: "nagmanipdcom",
      username: 23,
      password: true
    });
    expect(response.status).toBe(400);
    expect(response.data).toStrictEqual({
      message: "invalid inputs",
    });
  });

  it("should create a user with valid inputs", async () => {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email: "nagmanipd3@gmail.com",
      username: "nagmani",
      password: "itsboy"
    });
    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual({
      message: "signup initiated",
    });
  });
  it("should respond with user already exists ", async () => {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email: "nagmanipd3@gmail.com",
      username: "nagmani",
      password: "itsboy"
    });
    expect(response.status).toBe(409);
    expect(response.data).toStrictEqual({
      message: "user already exists",
    });
  });
});

describe("/POST signin", () => {
  it("should respond with invalid inputs on sending invalid email", async () => {
    const response = await axios.post(`${BASE_URL}/signin`, {
      email: "adfasdfasfd",
      password: "itsboy"
    });
    expect(response.status).toBe(400);
    expect(response.data).toStrictEqual({
      message: "invalid inputs"
    });
  });

  it("should respond with invalid credentials when sent invalid credentials", async () => {
    const response = await axios.post(`${BASE_URL}/signin`, {
      email: "nagmanipd3@gmail.com",
      password: "iasdfasdf"
    });
    expect(response.status).toBe(403);
    expect(response.data).toStrictEqual({
      message: "invalid credentials"
    });
  });

  it("should signin the user with token", async () => {
    const response = await axios.post(`${BASE_URL}/signin`, {
      email: "nagmanipd3@gmail.com",
      password: "itsboy"
    });
    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual({
      message: "signin successful",
      token: "asdf"
    });
  });
});

describe("/POST /verify-user", () => {
  it("should verify user on correct otp", async () => {
    const response = await axios.post(`${BASE_URL}/verify-user`, {
      otp: 1234
    });
    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual({
      message: "verified successfully",
      token: "asdf"
    });
  })

  it("shouldn't verify user on incorrect otp", async () => {
    const response = await axios.post(`${BASE_URL}/verify-user`, {
      otp: 232
    });
    expect(response.status).toBe(403);
    expect(response.data).toStrictEqual({
      message: "invalid otp",
    });
  })
});

