const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("DELETE /accounts/:id", () => {
  it("should delete an existing account and return 204 status", async () => {
    const newAccount = await request(app).post("/accounts").send({
      name: "Test Account",
      email: "test@example.com",
    });

    const id = newAccount.body.id;

    const response = await request(app).delete(`/accounts/${id}`);
    expect(response.status).to.equal(204);

    const check = await request(app).delete(`/accounts/${id}`);
    expect(check.status).to.equal(404);
  });

  it("should return 404 if account does not exist when deleting account", async () => {
    const response = await request(app).delete("/accounts/9999");
    expect(response.status).to.equal(404);
  });
});
