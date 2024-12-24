import { request } from "supertest";
import app from "./server";

describe("Server Tests", () => {
  test("should respond with 200 on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

afterAll(() => {
  app.close();
});
