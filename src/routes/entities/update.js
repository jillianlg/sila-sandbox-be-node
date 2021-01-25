// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { encryptMessage, decryptPrivateKey } = require('../../utils');
const { getEntity } = require('./getEntity');

// consts
const { SILA_URLS } = require('../../consts');
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');

const SILA_UPDATE_TYPES = {
    ADDRESS: 'address',
    IDENTITY: 'identity',
    EMAIL: 'email',
    PHONE: 'phone',
    ENTITY: 'entity'
}

async function update(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle
        },
    }

     // imitates retrieving the user's private key from your KMS
     const userInfo = await readFile('./userInfo.json', 'utf8')
     const parsedUserInfo = JSON.parse(userInfo);
     const encryptedPrivateKey = parsedUserInfo.USER_PRIVATE_KEY;
     const USER_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);
 
    
    if(!USER_PRIVATE_KEY) return new Error('No user found');
    
    // retrieve the user's uuid from getEntity
    const response = await getEntity({
        userHandle: data.userHandle,
        email: data.email
    });

    if(response.status !== 200) return new Error('entity not found');
    
    const entity = response.data;

    // if anything but entity is being updated, a uuid is needed
    if(data.type !== SILA_UPDATE_TYPES.ENTITY) {
        body.uuid = entity[SILA_UPDATE_TYPES[data.type]][0].uuid;
    }

    // add all update fields to the body, to avoid over-writing data with empty strings
    for(const key of Object.keys(data.updateBody)) {
        body[key] = data.updateBody[key];
    }

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = encryptMessage(appPrivateKey, body);
    const userSignature = encryptMessage(USER_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    }

    // build the request url
    const url = SILA_URLS.UPDATE + data.type;

    // request update
    try {
        return await axios({
            method: 'post',
            url: url,
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
    update,
    SILA_UPDATE_TYPES
}