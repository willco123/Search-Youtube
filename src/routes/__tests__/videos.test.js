const { SetUpMockApp } = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../videos");
const db = require("../../config/db");

app = SetUpMockApp();
app.use("/videos", router);

beforeAll(async () => {
  await db.query("use ytsearchDB_test");
});

describe("/videos", () => {
  describe("GET", () => {
    it("Should return array of videos and 200", async () => {
      const response = await supertest(app).get("/videos");
      expect(response.status).toBe(200);
      expect(response.type).toEqual("application/json");
    });
  });

  describe("GET ID", () => {
    it("Should return JSON of video and 200", async () => {
      const response = await supertest(app).get("/videos/1");
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(1);
    });
  });
});

describe("DELETE ID", () => {
  it("Should return JSON of video and 200", async () => {
    const response = await supertest(app).delete("/videos/2");
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await db.end();
});

//BeforeEach populate DB
//afterEach Remove all
//Do this for videos/channels/searchDB
