const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("PUT /accounts/:id", () => {
  it("should update an existing account and return 200 status with JSON body", async () => {
    const newAccount = await request(app).post("/accounts").send({
      name: "Test Account",
      email: "test@example.com",
    });

    const id = newAccount.body.id;

    const updatedAccountPayload = {
      name: "Updated Account",
      email: "updated@example.com",
    };

    const response = await request(app)
      .put(`/accounts/${id}`)
      .send(updatedAccountPayload);

    expect(response.status).to.equal(200);
    expect(response.body).to.include.keys("id", "name", "email");

    expect(response.body.name).to.equal(updatedAccountPayload.name);
    expect(response.body.email).to.equal(updatedAccountPayload.email);
  });

  it("should return 404 if account does not exist", async () => {
    const response = await request(app).put("/accounts/9999").send({
      name: "Nonexistent Account",
      email: "nonexistent@example.com",
    });

    expect(response.status).to.equal(404);
  });
});
