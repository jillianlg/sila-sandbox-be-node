// third party packages
const crypto = require('crypto');
const EthCrypto = require('eth-crypto');
const Web3 = require('web3');

// consts
const ENCRYPTION_KEY = require('../.env');

//creates a wallet on Ethereum
function createWallet() {
    const web3 = new Web3('https://localhost:8080');
    const wallet = web3.eth.accounts.create();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

// encrypts a private key
function encryptPrivateKey(privateKey) {
    const encryptionKey = crypto.createCipheriv('aes-128-cbc', ENCRYPTION_KEY);
    let encryptedKey = encryptionKey.update(privateKey, 'utf8', 'hex');
    encryptedKey += encryptionKey.final('hex');
    return encryptedKey;
}

// decrypts a private key
function decryptPrivateKey(encryptedPrivateKey) {
    const decryptionKey = crypto.createDecipheriv('aes-128-cbc', ENCRYPTION_KEY);
    let decryptedKey = decryptionKey.update(encryptedPrivateKey, 'hex', 'utf8');
    decryptedKey += decryptionKey.final('utf8');
    return decryptedKey;
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
    encryptMessage,
    encryptPrivateKey,
    decryptPrivateKey
}