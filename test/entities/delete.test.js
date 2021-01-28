// third party packages
const { expect } = require('chai');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

const SILA_DELETE_TYPES = {
    EMAIL: 'email',
    PHONE: 'phone',
    ID: 'identity',
    ADDRESS: 'address',
}

// NOTE: You will need to use /get_entity in order to retrieve the UUIDs needed for these tests

describe('tests Sila API integration', () => {
    it('should /delete/email', async () => {
        const EMAIL_UUID = '[GET EMAIL UUID FROM /get_entity]'
        
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_DELETE_TYPES.EMAIL,
                userHandle: USER_HANDLE,
                uuid: EMAIL_UUID,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /delete/phone', async () => {
        const PHONE_UUID = '[GET PHONE UUID FROM /get_entity]'
        
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_DELETE_TYPES.PHONE,
                userHandle: USER_HANDLE,
                uuid: PHONE_UUID,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
    it('should /delete/identity', async () => {
        const IDENTITY_UUID = '[GET IDENTITY UUID FROM /get_entity]'
        
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_DELETE_TYPES.IDENTITY,
                userHandle: USER_HANDLE,
                uuid: IDENTITY_UUID,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
    it('should /delete/address', async () => {
        const ADDRESS_UUID = '[GET ADDRESS UUID FROM /get_entity]'
        
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_DELETE_TYPES.ADDRESS,
                userHandle: USER_HANDLE,
                uuid: ADDRESS_UUID,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});