function CheckForQuery(query) {
  let isQuery;
  if (Object.keys(query).length === 0) {
    isQuery = 0;
  } else {
    if (
      Object.values(query)[0].length === 0 ||
      Object.values(query)[0] === " " //resolved a typeerror issue
    ) {
      isQuery = 0;
    } else {
      isQuery = 1;
    }
  }
  return isQuery;
}

module.exports = CheckForQuery;
