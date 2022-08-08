const { SetUpMockApp } = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../searchDB");
const db = require("../../config/db");

app = SetUpMockApp();
app.use("/searchDB", router);

beforeAll(async () => {
  await db.query("use ytsearchDB_test");
});

describe("/searchDB", () => {
  describe("GET", () => {
    it("Should return array of searchDB and 200", async () => {
      const response = await supertest(app).get("/searchDB?title=rock");
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async () => {
  await db.end();
});
