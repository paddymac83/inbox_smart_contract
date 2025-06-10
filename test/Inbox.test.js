const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],   // the argument is the initial message
    })
    .send({ from: accounts[0], gas: "1000000" });  // comment out to fail BE test as contract transactions isn't sent, so no address
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);  // asdserts the beforeEach works by attaching an address to the contract
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();  // calls the inital message
    assert.equal(message, "Hi there!");
  });
  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });  // calls the setMessage, changes it, and asserts
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
