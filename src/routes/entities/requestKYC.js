// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { encryptMessage, decryptPrivateKey } = require('../../utils');
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');

// consts
const { SILA_URLS } = require('../../consts');

async function requestKYC(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle,
            reference: 'ref'
        },
        message: 'header_msg'
    }

     // imitates retrieving the user's private key from your KMS
     const userInfo = await readFile('./userInfo.json', 'utf8')
     const parsedUserInfo = JSON.parse(userInfo);
     const encryptedPrivateKey = parsedUserInfo.USER_PRIVATE_KEY;
     const USER_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);
 
    
    if(!USER_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = encryptMessage(appPrivateKey, body);
    const userSignature = encryptMessage(USER_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    };

    // request kyc
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.REQUEST_KYC,
            headers: headers,
            data: body,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    requestKYC
}