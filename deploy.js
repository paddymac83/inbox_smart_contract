const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require("./compile");

//updated web3 and hdwallet-provider imports added for convenience
// truffle.HD allows us access to the MetaMask wallet via the mnemonic, and testnet to deploy the contract to
const provider = new HDWalletProvider(
    'siege hat ghost people equal carpet payment bounce project connect rather galaxy',
    'https://sepolia.infura.io/v3/63f41e7ac135498f9df0337d97f176de'
);
const web3 = new Web3(provider); // web3 constructor with the testnet and wallet account details

// deploy script to Sepolia testnet
const deploy = async () => {  // wrapping asyc in higer level function
  const accounts = await web3.eth.getAccounts();  // single mne can generate many accounts

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);  // contract address on testnet
  provider.engine.stop();
};
deploy();   // call the function
