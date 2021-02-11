// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../index');

/**
 * checks the status of a KYC request
 * @param data.userHandle [required] the user to check
 */
async function checkKYC(data) {
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

    // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    };

    // check kyc
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.CHECK_KYC,
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
    checkKYC
}