// third party packages
const axios = require('axios');

// local packages
const { signMessage } = require('../../utils');

// consts
const { APP_HANDLE, APP_PRIVATE_KEY } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * generates a link_token to connect Sila with Plaid
 * @param data.userHandle [required] the user whose accounts will be listed
 */
async function plaidLinkToken(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            app_handle: APP_HANDLE,
            user_handle: data.userHandle
        },
    }

    // generate authorization headers
    const authSignature = signMessage(APP_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
    }

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.PLAID_LINK_TOKEN,
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
    plaidLinkToken
}