// third party packages
const { v4 } = require('uuid');
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

// local packages
const { createWallet, encryptMessage, encryptPrivateKey } = require('../../utils');

// consts
const { SILA_URLS } = require('../../consts');
const { APP_HANDLE, APP_PRIVATE_KEY } = require('../../../.env');

// NOTE: This only registers a user with Sila. It does not handle login informtion.
// You will need to create a separate login structure for your app.

async function register(userInfo) {
    // create the user handle
    const uuid = v4();
    const USER_HANDLE = `${APP_HANDLE}.${userInfo.firstName}.${userInfo.lastName}.${uuid}`;
    userInfo.handle = USER_HANDLE;

    // NOTE: Your app will need to secure user private keys using a KSM
    // ** THIS IS NOT A SECURE METHOD TO DO SO **
    // ** DO NOT USE THIS METHOD UNDER ANY CIRCUMSTANCES FOR ANYTHING OTHER THAN TESTING **
    // ** NEVER COMMIT OR SHARE PRIVATE KEYS **
    const wallet = createWallet();
    const KMSUserInfo = JSON.stringify({
        USER_HANDLE,
        USER_PRIVATE_KEY: encryptPrivateKey(wallet.privateKey)
    });
    // NOTE: this will OVERWRITE userInfo.json every time it is run
    await writeFile('userInfo.json', KMSUserInfo);

    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: USER_HANDLE
        },
        message: 'entity_msg',
        crypto_entry: {
            crypto_address: wallet.address,
            crypto_code: 'ETH'
        },
        entity: {
            entity_name: `${userInfo.firstName}.${userInfo.lastName}`,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            relationship: 'user'
        }
    }

    // encrypt the message
    const appPrivateKey = APP_PRIVATE_KEY;
    const signature = encryptMessage(appPrivateKey, body);
    const headers = { authsignature: signature };

    // register the user with Sila
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.REGISTER_USER,
            data: JSON.stringify(body),
            headers: headers,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    register
}