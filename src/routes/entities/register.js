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

/**
 * registers a user with sila
 * @param userInfo.entity.type [optional] either "business" or "individual". Will default to "individual" if excluded
 * @param userInfo.entity.birthdate [optional] birthdate of the individual. must be YYYY-MM-DD
 * @param userInfo.entity.entity_name [required if business] the name of the entity
 * @param userInfo.entity.first_name [required if individual]
 * @param userInfo.entity.last_name [required if individual]
 * 
 * @param userInfo.address.address_alias [optional] nickname for address
 * @param userInfo.address.street_address_1 [optional] street address first line
 * @param userInfo.address.street_address_2 [optional] street address second line
 * @param userInfo.address.city
 * @param userInfo.address.state [optiona] in the format XX using standard state abbreviation
 * @param userInfo.address.country [optional] only option is "US" for now
 * @param userInfo.address.postal_code [optional] accepts both ##### and #####-#### formats
 * 
 * @param userInfo.identity.identity_alias [optional] only options are "SSN" or "EIN"
 * @param userInfo.identity.identity_value [optional] must be valid SSN or EIN
 * 
 * @param userInfo.contact.phone [optional] must be ###-###-#### format
 * @param userInfo.contact.contact_alias [optional] nickname for contact
 * @param userInfo.contact.email [optional] must match standard email format
 */
async function register(userInfo) {
    console.log('userInfo: ', userInfo);
    // create the user handle
    const uuid = v4();
    let USER_HANDLE;
    if(userInfo.entity.type === 'business') {
        const flattenedBusinessName = userInfo.entity.entity_name.replace(/ /g, "_");
        USER_HANDLE = `${APP_HANDLE}.${flattenedBusinessName}.${uuid}`;
    } else {
        USER_HANDLE = `${APP_HANDLE}.${userInfo.entity.first_name}.${userInfo.entity.last_name}.${uuid}`;
    }

    // create the wallet
    const wallet = createWallet();

    // See https://docs.silamoney.com/docs/register for further endpoint details
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: USER_HANDLE,
            reference: 'ref',
        },
        message: 'entity_msg',
        crypto_entry: {
            crypto_address: wallet.address,
            crypto_code: 'ETH'
        },
    }

    // add each data type to the body, to avoid populating data with empty strings
    for(const key of Object.keys(userInfo)) {
        body[key] = userInfo[key];
    }

    // NOTE: Your app will need to secure user private keys using a KSM
    // ** THIS IS NOT A SECURE METHOD TO DO SO **
    // ** DO NOT USE THIS METHOD UNDER ANY CIRCUMSTANCES FOR ANYTHING OTHER THAN TESTING **
    // ** NEVER COMMIT OR SHARE PRIVATE KEYS **

    // NOTE: this will OVERWRITE the .json file every time it is run
    /**
     * You will need to manually save encrypted private keys
     * and user handles for testing endpoints
     * that involve more than one user
     */

    // the type will default to 'individual' if not provided
    const entityFileName = userInfo.entity.type === 'business' ? 'businessInfo.json' : 'userInfo.json';

     const KMSEntityInfo = JSON.stringify({
        USER_HANDLE,
        USER_PRIVATE_KEY: encryptPrivateKey(wallet.privateKey)
    });
    await writeFile(entityFileName, KMSEntityInfo);

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