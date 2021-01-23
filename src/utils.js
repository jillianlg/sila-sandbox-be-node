const EthCrypto = require('eth-crypto');
const Web3 = require('web3');

//creates a wallet on Ethereum
function createWallet() {
    const web3 = new Web3('https://localhost:8080');
    const wallet = web3.eth.accounts.create();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

// encrypts a message
function encryptMessage(privateKey, message) {
    // stringify message
    const jsonMessage = JSON.stringify(message);

    // encrypt message
    const msgHash = EthCrypto.hash.keccak256(jsonMessage);

    // create and return a signature, removing the default '0x'
    return EthCrypto.sign(privateKey, msgHash).substring(2);
}

module.exports = {
    createWallet,
    encryptMessage
}