// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { encryptMessage, decryptPrivateKey } = require('../../utils');

// consts
const { APP_HANDLE, APP_PRIVATE_KEY } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * retrieves list of user's linked accounts
 * @param data.userHandle [required] the user whose accounts will be listed
 */
async function getAccountBalance(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle
        },
        account_name: 'default'
    }

    // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const authSignature = encryptMessage(APP_PRIVATE_KEY, body);
    const userSignature = encryptMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    }

    // request update
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.GET_ACCOUNT_BALANCE,
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
    getAccountBalance
}