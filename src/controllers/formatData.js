require("dotenv").config();
const binaryData = require("../../config/binary.config.json");
console.log(binaryData);
exports.RawData2DeviceData = (data) => {
  try {
    if (!binaryData) return;

    let rawDataObj = {};
    if (data[1] == 0 && data[2] == 0) return;
    if (data[0] !== binaryData.dataType) return;
    let pos = binaryData.startIndex;

    if (binaryData.clone.enable) {
      // clone data by times
      for (let i = 0; i < binaryData.clone.times; i++) {
        let v = 0;
        let v_h = 0;
        let v_l = 0;
        for (let j = 0; j < binaryData.rawData.length; j++) {
          if (binaryData.rawData[j].byteSize > 1) {
            // low byte
            v_l = data[pos];
            ++pos;
            v_l <<= 8;
            v_l += data[pos];
            ++pos;

            // high byte
            v_h = data[pos];
            ++pos;
            v_h <<= 8;
            v_h += data[pos];
            ++pos;

            rawDataObj[
              `${binaryData.defaultKey}${i + 1}${binaryData.rawData[j].key}`
            ] =
              Math.round(v_l + (v_h << 16)) /
              Math.pow(10, binaryData.rawData[j].decimal);
          } else {
            v = data[pos];
            ++pos;
            v <<= 8;
            v += data[pos];
            ++pos;

            rawDataObj[
              `${binaryData.defaultKey}${i + 1}${binaryData.rawData[j].key}`
            ] = v / Math.pow(10, binaryData.rawData[j].decimal);
          }
        }
      }
    } else {
      // default data
      for (let i = 0; i < binaryData.rawData.length; i++) {
        let v = 0;
        let v_h = 0;
        let v_l = 0;
        if (binaryData.rawData[i].byteSize > 1) {
          // low byte
          v_l = data[pos];
          ++pos;
          v_l <<= 8;
          v_l += data[pos];
          ++pos;

          // high byte
          v_h = data[pos];
          ++pos;
          v_h <<= 8;
          v_h += data[pos];
          ++pos;

          rawDataObj[
            `${binaryData.defaultKey}${i + 1}${binaryData.rawData[i].key}`
          ] =
            Math.round(v_l + (v_h << 16)) /
            Math.pow(10, binaryData.rawData[i].decimal);
        } else {
          v = data[pos];
          ++pos;
          v <<= 8;
          v += data[pos];
          ++pos;

          rawDataObj[
            `${binaryData.defaultKey}${i + 1}${binaryData.rawData[i].key}`
          ] = v / Math.pow(10, binaryData.rawData[i].decimal);
        }
      }
    }

    return rawDataObj;
  } catch (error) {
    throw error;
  }
};
