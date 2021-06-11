const formula = artifacts.require("formula");

module.exports = function(deployer) {
  deployer.deploy(formula);
};