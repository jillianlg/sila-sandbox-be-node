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

// variables
// change these variables as needed
const FIRST_NAME = 'Firstname';
const LAST_NAME = 'Lastname';
const EMAIL = 'email@email.com';

const ADDRESS_ALIAS = 'Home';
const STREET_ADDRESS_1 = 'Street Address';
const CITY = 'City';
const STATE = 'OR';
const POSTAL_CODE = '90210';

const PHONE = '1112223333';

const SSN = '111223333';

const BIRTHDATE = '1990-02-28';

// NOTE: These tests are not intended to be run all at once
// Using .only and .skip, only run select tests in any given execution

describe('tests Sila API integration', () => {
    it('should /register', async () => {
        const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: {
                firstName: FIRST_NAME,
                lastName: LAST_NAME
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    })

    it('should /get_entity', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json', 'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;

        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITY,
            data: {
                userHandle: USER_HANDLE
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });

        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    })

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

    it('should /update/entity', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.ENTITY,
                userHandle: USER_HANDLE,
                email: EMAIL,
                updateBody: {
                    birthdate: BIRTHDATE
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /request_kyc', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.REQUEST_KYC,
            data: {
                userHandle: USER_HANDLE,
                email: EMAIL
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    })

    it('should /check_kyc', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json',  'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.CHECK_KYC,
            data: {
                userHandle: USER_HANDLE,
                email: EMAIL
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    })
})