// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { SILA_UPDATE_TYPES } = require('../../src/routes/entities/update');
const {
    EMAIL,
    ADDRESS_ALIAS,
    STREET_ADDRESS_1,
    CITY,
    STATE,
    POSTAL_CODE,
    SSN,
    PHONE,
    EIN
} = require('../consts');
const {
    USER_HANDLE_INDIVIDUAL_ONE,
    USER_HANDLE_BUSINESS_ONE
} = require('../../.env');

describe.skip('tests Sila API integration', () => {
    describe('should add data to an individual', () => {
        it('should /add/email', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.EMAIL,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    updateBody: {
                        email: EMAIL
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/address', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.ADDRESS,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
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
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/phone', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.PHONE,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    email: EMAIL,
                    updateBody: {
                        phone: PHONE
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/identity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.IDENTITY,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
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
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    });

    describe('should add data to a business', () => {
        it('should /add/email', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.EMAIL,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    updateBody: {
                        email: EMAIL
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/address', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.ADDRESS,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
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
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/phone', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.PHONE,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    email: EMAIL,
                    updateBody: {
                        phone: PHONE
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
       it('should /add/identity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.ADD,
                data: {
                    type: SILA_UPDATE_TYPES.IDENTITY,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    email: EMAIL,
                    updateBody: {
                        identity_alias: 'EIN',
                        identity_value: EIN
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    });
});