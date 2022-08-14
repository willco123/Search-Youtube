const db = require("../config/db");
// file scoped constants usually al caps
const table = "channels";
const column = "channel_name";

// function names usually camel case
async function StoreData(dataYT) {
  // if order doesn't matter in this, you can speed up by doing Promise.all - demo in  below function

  for (let index in dataYT) {
    //jest doesn't like for of here
    let { title, date, channelTitle } = dataYT[index];
    try {
      let id;
      // isUnique not reassigned - use const
      // a bit confusing as the prefix is makes me think this will return a boolean, but seems it return the id?
      //      may be worth renaming
      let isUnique = await CheckUniqueness(channelTitle);
      if (isUnique) id = isUnique;
      else {
        // I really hate getting values from seemingly random indexes on an array - thought this is personal preference
        // Could destructure the result ? i.e.

        // const [result] = await db.query(
        //   "INSERT INTO CHANNELS(channel_name)\
        //               VALUES (?)",
        //   [channelTitle]
        // );
        // id = result.insertId;

        const result = await db.query(
          "INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)",
          [channelTitle]
        );
        id = result[0].insertId;
      }

      await db.query(
        "INSERT INTO VIDEOS(title, date, channel_id)\
                      VALUES (?,?,?)",
        [title, date, id]
      );
    } catch (err) {
      throw err;
    }
  }
}

// Demo potentially quicker/scalable version of above function
async function storeData(dataYT) {
  // if order doesn't matter in this, you can speed up by doing Promise.all:
  const doLogic = async ({ title, date, channelTitle }) => {
    try {
      let id;
      let isUnique = await CheckUniqueness(channelTitle);
      if (isUnique) id = isUnique;
      else {
        const [result] = db.query(
          "INSERT INTO CHANNELS(channel_name)\
                      VALUES (?)",
          [channelTitle]
        );
        id = result.insertId;
      }

      db.query(
        "INSERT INTO VIDEOS(title, date, channel_id)\
                      VALUES (?,?,?)",
        [title, date, id]
      );
    } catch (err) {
      throw err;
    }
  };

  await Promise.all(
    dataYT.map(({ title, date, channelTitle }) =>
      doLogic({ title, date, channelTitle })
    )
  );
}

// check implies returning a bool - maybe getUniqureId would be better?
async function CheckUniqueness(channelTitle) {
  try {
    selectItem = await db.query("SELECT * from ?? where (??) = (?)", [
      table,
      column,
      channelTitle,
    ]);
    // again isRow implies boolean - seems this returns an object?
    isRow = selectItem[0][0];
    if (isRow === undefined) return 0;
    return isRow.id;
  } catch (err) {
    throw err;
  }
}

// can array destructure
async function GetAllFromTable(table) {
  // const [items] = await db.query("SELECT * from ??", [table]);
  // return items;
  const items = await db.query("SELECT * from ??", [table]);
  return items[0];
}

async function GetItemByIDFromTable(table, id) {
  const query = await db.query("SELECT * from ?? WHERE (id) = (?)", [
    table,
    id,
  ]);
  const item = query[0][0];

  // if item is never false or 0 or null by design can simplify below
  // return item || 0

  if (item === undefined) return 0;

  return item;
}

async function DeleteItemByIDFromTable(table, id) {
  //returns bool
  // ^ does this return bool?
  const deletedItem = await db.query("DELETE FROM ?? WHERE id = (?)", [
    table,
    id,
  ]);
  // can use ternary here:
  // return deletedItem[0].affectedRows === 0 ? 0 : 1;
  if (deletedItem[0].affectedRows === 0) return 0;
  else return 1;
}

async function SearchDBFromTable(table, column, value) {
  const query = await db.query("SELECT * FROM ?? WHERE (??) LIKE (?)", [
    table,
    column,
    value,
  ]);
  const results = query[0];
  return results;
}

// unsure what fk is
async function GetParentItemsByFK(parentTable, parentColumn, fk) {
  const query = await db.query("select (??) from ?? where id = ? ", [
    parentColumn,
    parentTable,
    fk,
  ]);
  const parentItem = query[0][0];
  return parentItem[parentColumn];
}

async function GetChildItemsWithFK(childTable, childColumn, fk) {
  const query = await db.query("select (??) from ?? where channel_id = ? ", [
    childColumn,
    childTable,
    fk,
  ]);
  const childItems = query[0];
  const childValues = [];

  // may be more syntactic to use map here
  // return childItems.map((key) => key[childColumn]);
  for (let key of childItems) childValues.push(key[childColumn]);
  return childValues;
}

module.exports = {
  StoreData,
  GetAllFromTable,
  GetItemByIDFromTable,
  DeleteItemByIDFromTable,
  SearchDBFromTable,
  GetParentItemsByFK,
  GetChildItemsWithFK,
};
