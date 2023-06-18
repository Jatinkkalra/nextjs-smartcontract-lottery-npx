// Objective:
// Used to import other "constants" files and export them together (in "../components/LotteryEntrance.js" in this case)

const contractAddresses = require("./contractAddresses.json");
const abi = require("./abi.json");

module.exports = {
  abi,
  contractAddresses,
};
