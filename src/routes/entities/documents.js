// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const FormData = require('form-data');
const readFile = util.promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey, hashImage } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
* upload supporting documentation for KYC
*/
async function documents(data) {
    // create form data object
    const formData = new FormData();

    // add the image to the request
    formData.append('file', fs.ReadStream('./blank.jpeg'));

    // convert the image into binary data
    const imageBinary = await readFile('./blank.jpeg');

    // create hash of the image
    const imageHash = hashImage(imageBinary);
    
    // create the form data
    const rawFormData = {
        header: {

            created: Math.floor(Date.now() / 1000),
            app_handle: APP_HANDLE,
            user_handle: data.userHandle,
            reference: 'ref'
        },
        message: 'header_msg',
        filename: 'blank.jpeg',
        mime_type: 'image/jpeg',
        document_type: 'id_drivers_license',
        identity_type: 'license',
        hash: imageHash
    }

    // append data to the formData
    formData.append('data', JSON.stringify(rawFormData));

    // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, rawFormData);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, rawFormData);

    // create request headers
    const headers = formData.getHeaders();
    headers.authsignature = authSignature;
    headers.usersignature = userSignature;

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.DOCUMENTS,
            headers: headers,
            data: formData,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    documents
}