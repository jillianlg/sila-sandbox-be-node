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
 * @param entityInfo.entity.first_name [required if individual] the individual's first name
 * @param entityInfo.entity.last_name [required if individual] the individual's last name
 * @param entityInfo.entity.entity_name [required if business] the name of the entity
 * @param entityInfo.entity.businessType [required if business] see list of possible types here: https://docs.silamoney.com/docs/get_business_types
 * @param entityInfo.entity.naics_code [required if business] see list of possible codes here: https://docs.silamoney.com/docs/get_naics_categories
 * @param entityInfo.entity.type [optional] either "business" or "individual". Will default to "individual" if excluded
 * @param entityInfo.entity.birthdate [optional] birthdate of the individual. must be YYYY-MM-DD
 * 
 * @param entityInfo.address.address_alias [optional] nickname for address
 * @param entityInfo.address.street_address_1 [optional] street address first line
 * @param entityInfo.address.street_address_2 [optional] street address second line
 * @param entityInfo.address.city
 * @param entityInfo.address.state [optiona] in the format XX using standard state abbreviation
 * @param entityInfo.address.country [optional] only option is "US" for now
 * @param entityInfo.address.postal_code [optional] accepts both ##### and #####-#### formats
 * 
 * @param entityInfo.identity.identity_alias [optional] only options are "SSN" or "EIN"
 * @param entityInfo.identity.identity_value [optional] must be valid SSN or EIN
 * 
 * @param entityInfo.contact.phone [optional] must be ###-###-#### format
 * @param entityInfo.contact.contact_alias [optional] nickname for contact
 * @param entityInfo.contact.email [optional] must match standard email format
 */
async function register(entityInfo) {
    // create the user handle
    const uuid = v4();
    let USER_HANDLE;
    if((entityInfo.entity.type) && (entityInfo.entity.type === 'business')) {
        const flattenedBusinessName = entityInfo.entity.entity_name.replace(/ /g, "_");
        USER_HANDLE = `${APP_HANDLE}.${flattenedBusinessName}.${uuid}`;
    } else {
        USER_HANDLE = `${APP_HANDLE}.${entityInfo.entity.first_name}.${entityInfo.entity.last_name}.${uuid}`;
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
    for(const key of Object.keys(entityInfo)) {
        body[key] = entityInfo[key];
    }

    // NOTE: Your app will need to secure user private keys using a KSM
    // ** THIS IS NOT A SECURE METHOD TO DO SO **
    // ** DO NOT USE THIS METHOD UNDER ANY CIRCUMSTANCES FOR ANYTHING OTHER THAN TESTING **
    // ** NEVER COMMIT OR SHARE PRIVATE KEYS **
    const entityFileName = `${USER_HANDLE}.info.json`;
    const KMSEntityInfo = JSON.stringify({
        USER_HANDLE,
        USER_PRIVATE_KEY: encryptPrivateKey(wallet.privateKey)
    });
    await writeFile(entityFileName, KMSEntityInfo);

    // encrypt the message
    const appPrivateKey = APP_PRIVATE_KEY;
    const signature = encryptMessage(appPrivateKey, body);
    const headers = {
        authsignature: signature
    };

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