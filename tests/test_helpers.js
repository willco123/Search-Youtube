require("dotenv").config();
const express = require("express");
const { StoreData } = require("../src/models/db");
//const db = require("../src/config/db");

function SetUpMockApp() {
  const app = express();
  app.use(express.json());
  return app;
}

function CreateMockData() {
  let mockData = {
    mockData1: {
      title: "Title One",
      date: new Date("2022-01-01"),
      channel_name: "Channel One",
    },
    mockData2: {
      title: "Title Two",
      date: new Date("2022-02-02"),
      channel_name: "Channel Two",
    },
    mockData3: {
      title: "Title Three",
      date: new Date("2022-03-03"),
      channel_name: "Channel Three",
    },
  };

  return mockData;
}

function CreateMockData2() {
  let mockData = [];

  mockData["Title One"] = [
    new Date("2022-01-01".substring(0, 10)),
    "Channel One",
  ];
  mockData["Title Two"] = [new Date("2022-02-02"), "Channel Two"];
  mockData["Title Three"] = [new Date("2022-03-03"), "Channel Three"];

  return mockData;
}

async function PopulateDB(mockData) {
  let { title, date, channel_name } = mockData;

  await StoreData();
}

myData = CreateMockData();
myOtherData = CreateMockData2();
console.log(myData);
console.log(myOtherData);

module.exports = {
  SetUpMockApp,
};
