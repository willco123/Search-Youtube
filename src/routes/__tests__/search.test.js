require("iconv-lite").encodingExists("foo"); //Handles mysql2 encoding error

const {
  SetUpMockApp,
  UseTestDB,
  EndDB,
} = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../search");

app = SetUpMockApp();
app.use("/search", router);

beforeAll(async () => {
  await UseTestDB();
});

describe("/search", () => {
  describe("GET", () => {
    it("Should save videos to DB", async () => {
      const response = await supertest(app).get("/search");
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async () => {
  await EndDB();
});
