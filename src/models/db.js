const db = require("../config/db");
const table = "channels";
const column = "channel_name";

async function StoreData(dataYT) {
  for (let index in dataYT) {
    //jest doesn't like for of here
    let { title, date, channelTitle } = dataYT[index];
    try {
      let id;
      let isUnique = await CheckUniqueness(channelTitle);
      if (isUnique) {
        id = isUnique;
      } else {
        let result = await db.query(
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

async function CheckUniqueness(channelTitle) {
  try {
    selectItem = await db.query("SELECT * from ?? where (??) = (?)", [
      table,
      column,
      channelTitle,
    ]);
    isRow = selectItem[0][0];
    if (isRow === undefined) return 0;
    return isRow.id;
  } catch (err) {
    throw err;
  }
}

async function GetAllFromTable(table) {
  const items = await db.query("SELECT * from ??", [table]);
  return items[0];
}

async function GetItemByIDFromTable(table, id) {
  const query = await db.query("SELECT * from ?? WHERE (id) = (?)", [
    table,
    id,
  ]);
  const item = query[0][0];
  if (item === undefined) return 0;

  return item;
}

async function DeleteItemByIDFromTable(table, id) {
  //returns bool
  const deletedItem = await db.query("DELETE FROM ?? WHERE id = (?)", [
    table,
    id,
  ]);
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
