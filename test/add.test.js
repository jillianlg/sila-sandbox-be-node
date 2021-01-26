// third party packages
const { expect } = require('chai');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { silaAPI } = require('../index');

// consts
const { SILA_PATHS } = require('../src/routes/index');
const { SILA_UPDATE_TYPES } = require('../src/routes/entities/update');
const {
    EMAIL,
    ADDRESS_ALIAS,
    STREET_ADDRESS_1,
    CITY,
    STATE,
    POSTAL_CODE,
    SSN,
    PHONE
} = require('./consts');


describe('tests Sila API integration', () => {
    it('should /add/email', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;

        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: SILA_UPDATE_TYPES.EMAIL,
                userHandle: USER_HANDLE,
                updateBody: {
                    email: EMAIL
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /add/address', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;

        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: SILA_UPDATE_TYPES.ADDRESS,
                userHandle: USER_HANDLE,
                updateBody: {
                    address_alias: ADDRESS_ALIAS,
                    street_address_1: STREET_ADDRESS_1,
                    city: CITY,
                    state: STATE,
                    country: 'US', // 'US' is the only acceptable country at this time
                    postal_code: POSTAL_CODE
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /add/phone', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: SILA_UPDATE_TYPES.PHONE,
                userHandle: USER_HANDLE,
                email: EMAIL,
                updateBody: {
                    phone: PHONE
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /add/identity', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: SILA_UPDATE_TYPES.IDENTITY,
                userHandle: USER_HANDLE,
                email: EMAIL,
                updateBody: {
                    identity_alias: 'SSN',
                    identity_value: SSN
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});