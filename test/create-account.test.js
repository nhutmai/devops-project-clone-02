const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("POST /accounts", () => {
  it("should create a new account and return 201 with JSON body", async () => {
    const payload = { name: "Donal Trump", email: "dt@example.com" };
    const res = await request(app)
      .post("/accounts")
      .send(payload)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(201);
    expect(res.body).to.include.keys("id", "name", "email");

    expect(res.body.name).to.equal(payload.name);
    expect(res.body.email).to.equal(payload.email);
  });
});
