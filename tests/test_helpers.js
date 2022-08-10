require("dotenv").config();
const express = require("express");
const { StoreData } = require("../src/models/db");
const db = require("../src/config/db");

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
      channelTitle: "Channel One",
    },
    mockData2: {
      title: "Title Two",
      date: new Date("2022-02-02"),
      channelTitle: "Channel Two",
    },
    mockData3: {
      title: "Title Three",
      date: new Date("2022-03-03"),
      channelTitle: "Channel Three",
    },
  };

  return mockData;
}

async function ClearDB() {
  await db.query("delete from videos;");
  await db.query("delete from channels;");
}

async function GetFirstVideo() {
  items = await db.query("Select * from videos;");
  firstItemID = items[0][0].id;
  return firstItemID;
}

async function GetFirstChannel() {
  items = await db.query("Select * from channels;");
  firstItemID = items[0][0].id;
  return firstItemID;
}

async function GetAllChannels() {
  items = await db.query("select * from channels;");
  return items[0];
}

async function GetAllVideos() {
  items = await db.query("select * from videos;");
  return items[0];
}

async function UseTestDB() {
  await db.query("use ytsearchDB_test");
}

async function EndDB() {
  await await db.end();
}

module.exports = {
  SetUpMockApp,
  CreateMockData,
  ClearDB,
  StoreData,
  GetFirstVideo,
  GetFirstChannel,
  GetAllChannels,
  GetAllVideos,
  UseTestDB,
  EndDB,
};

//Test multi-pages & multi videos to a single channel
//Test FAILED YT Connection, bad API key
//Test duplicate channel entry
