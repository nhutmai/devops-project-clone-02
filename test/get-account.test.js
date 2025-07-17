const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /accounts/:id", () => {
  it("should return an existing account by ID", async () => {
    const newAccount = await request(app).post("/accounts").send({
      name: "Test Account",
      email: "test@example.com",
    });

    const id = newAccount.body.id;

    const response = await request(app).get(`/accounts/${id}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.include.keys("id", "name", "email");

    expect(response.body.name).to.equal("Test Account");
    expect(response.body.email).to.equal("test@example.com");
  });

  it("should return 404 if account does not exist", async () => {
    const response = await request(app).get("/accounts/9999");
    expect(response.status).to.equal(404);
  });
});
