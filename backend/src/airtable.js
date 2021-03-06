const Airtable = require('airtable');
const config = require('./config');

const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(
  config.baseId
);

const checkForUser = async (inputObj, callback) => {
  let airTableColumn;
  let userInput;
  if (Object.keys(inputObj)[0] === 'phone') {
    userInput = inputObj.phone;
    airTableColumn = 'Please provide your contact phone number:';
  } else {
    userInput = inputObj.email;
    airTableColumn = 'Email Address';
  }
  try {
    return base(config.AIRTABLE_VOLUNTEERS_TABLE_NAME)
      .select({
        view: config.AIRTABLE_VOLUNTEERS_VIEW_NAME,
        maxRecords: 1,
        filterByFormula: `{${airTableColumn}} = '${userInput}'`,
      })
      .eachPage((records, nextPage) => {
        if (records[0]) {
          callback(records[0].id);
          return;
        }
        console.log('no record found');
      });
  } catch (e) {
    console.log(e);
  }
};

const getRecord = (recordID, res) => {
  base(config.AIRTABLE_VOLUNTEERS_TABLE_NAME).find(recordID, (err, record) => {
    console.log(record);
    res.send({ ...record });
  });
};
const updateRecord = (recordID, updatedObject) => {
  base(config.AIRTABLE_VOLUNTEERS_TABLE_NAME).find(recordID, (err, record) => {
    Object.keys(record).forEach(key => {
      if (record.get(key) !== updatedObject[`${key}`]) {
        record.patchUpdate({ [key]: updatedObject[`${key}`] });
      }
    });
  });
};
module.exports = { checkForUser, getRecord, updateRecord };
