require("dotenv").config();
const { RawData2DeviceData } = require("./formatData");

module.exports = (data) => {
  try {
    let deviceData = RawData2DeviceData(data);
    console.log(deviceData);
  } catch (error) {
    console.log(error);
  }
};
