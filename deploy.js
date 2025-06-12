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
