const {
  SetUpMockApp,
  CreateMockData,
  ClearDB,
  StoreData,
  GetFirstChannel,
  GetAllChannels,
  GetAllVideos,
} = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../channels");
const db = require("../../config/db");
const promisePool = require("../../config/db");

app = SetUpMockApp();
app.use("/channels", router);

beforeAll(async () => {
  await db.query("use ytsearchDB_test");
});

mockUsers = CreateMockData();

beforeEach(async () => {
  await ClearDB();
  await StoreData(mockUsers);
});

describe("/channels", () => {
  describe("GET", () => {
    it("Should return array of channels and 200", async () => {
      const response = await supertest(app).get("/channels");
      expect(response.status).toBe(200);
    });
  });

  describe("GET ID", () => {
    it("Should find the first item in DB", async () => {
      firstItemID = await GetFirstChannel();
      const response = await supertest(app).get("/channels/" + firstItemID);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(firstItemID);
    });
  });

  describe("GET ID", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).get("/channels/" + 1);
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE ID", () => {
    it("Should delete the first item in DB", async () => {
      firstItemID = await GetFirstChannel();
      const response = await supertest(app).delete("/channels/" + firstItemID);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE ID", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).delete("/channels/" + 1);
      expect(response.status).toBe(404);
    });
  });
});

//Need to test fail cases now
afterAll(async () => {
  await db.end();
});
