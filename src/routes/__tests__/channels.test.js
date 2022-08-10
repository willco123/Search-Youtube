const {
  SetUpMockApp,
  CreateMockData,
  ClearDB,
  StoreData,
  GetFirstChannel,
  GetAllChannels,
  GetAllVideos,
  UseTestDB,
  EndDB,
} = require("../../../tests/test_helpers");
const supertest = require("supertest");
const router = require("../channels");

app = SetUpMockApp();
app.use("/channels", router);

beforeAll(async () => {
  await UseTestDB();
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

  describe("GET Query", () => {
    it("Should find specific Item and associated video", async () => {
      const response = await supertest(app).get(
        "/channels/?channel_name=Channel One"
      );
      expect(response.status).toBe(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            channel_name: "Channel One",
            Videos: ["Title One"], // could do aray containing here for channels with lots of values
          }),
        ])
      );
      expect(response.type).toEqual("application/json");
    });
  });

  describe("GET Query", () => {
    it("Should return 404", async () => {
      const response = await supertest(app).get(
        "/channels/?badchannel_name=Channel One"
      );
      expect(response.status).toBe(404);
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

afterAll(async () => {
  await EndDB();
});
