const {
  SetUpMockApp,
  CreateMockData,
  ClearDB,
  StoreData,
  GetFirstVideo,
  UseTestDB,
  EndDB,
} = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../videos");

app = SetUpMockApp();
app.use("/videos", router);

beforeAll(async () => {
  await UseTestDB();
});

mockUsers = CreateMockData();

beforeEach(async () => {
  await ClearDB();
  await StoreData(mockUsers);
});

describe("/videos", () => {
  describe("GET", () => {
    it("Should return array of videos and 200", async () => {
      const response = await supertest(app).get("/videos");
      expect(response.status).toBe(200);
      expect(response.type).toEqual("application/json");
    });
  });

  describe("GET Query", () => {
    it("Should specific Item and associated channel", async () => {
      const response = await supertest(app).get("/videos/?title=Title One");
      expect(response.status).toBe(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Title One",
            Channel: "Channel One",
          }),
        ])
      );
      expect(response.type).toEqual("application/json");
    });
  });

  describe("GET Query", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).get("/videos/?badtitle=Title One");
      expect(response.status).toBe(404);
    });
  });

  describe("GET ID", () => {
    it("Should find the first item in DB", async () => {
      firstItemID = await GetFirstVideo();
      const response = await supertest(app).get("/videos/" + firstItemID);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(firstItemID);
    });
  });

  describe("GET ID", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).get("/videos/" + 1);
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE ID", () => {
    it("Should delete the first item in DB", async () => {
      firstItemID = await GetFirstVideo();
      const response = await supertest(app).delete("/videos/" + firstItemID);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE ID", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).delete("/videos/" + 1);
      expect(response.status).toBe(404);
    });
  });
});

afterAll(async () => {
  await EndDB();
});
