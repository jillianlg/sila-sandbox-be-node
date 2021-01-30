// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { SILA_UPDATE_TYPES } = require('../../src/routes/entities/update');
const {
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
    UUID_BUSINESS_EMAIL,
    UUID_BUSINESS_ADDRESS,
    UUID_BUSINESS_PHONE,
    UUID_BUSINESS_IDENTITY,
} = require('../../.env');
const {
    USER_HANDLE_INDIVIDUAL_ONE,
    USER_HANDLE_BUSINESS_ONE
} = require('../../.env');

describe.skip('tests Sila API integration', () => {
    describe('updates an individual', () => {
        it('should /update/entity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.ENTITY,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    updateBody: {
                        first_name: 'NewFirst',
                        last_name: 'NewLast',
                        birthdate: '1990-01-01',
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/email', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.EMAIL,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    uuid: UUID_INDIVIDUAL_EMAIL,
                    updateBody: {
                        email: 'newemail@newemail.com'
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/address', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.ADDRESS,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    uuid: UUID_INDIVIDUAL_ADDRESS,
                    updateBody: {
                        address_alias: 'new address alias',
                        street_address_1: 'New Place',
                        street_address_2: 'PO Box New',
                        city: 'New City',
                        state: 'AL',
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/phone', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.PHONE,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    uuid: UUID_INDIVIDUAL_PHONE,
                    updateBody: {
                        phone: '0987654321'
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/identity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.IDENTITY,
                    userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                    uuid: UUID_INDIVIDUAL_IDENTITY,
                    updateBody: {
                        identity_alias: 'SSN',
                        identity_value: '333221111'
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

    describe('updates an business', () => {
        it('should /update/entity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.ENTITY,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    updateBody: {
                        entity_name: "New Name",
                        business_type: "llc",
                        naics_code: 114,
                        doing_business_as: 'new DBA',
                        business_website: 'http://www.business.com'
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/email', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.EMAIL,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    uuid: UUID_BUSINESS_EMAIL,
                    updateBody: {
                        email: 'newemail@newemail.com'
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/address', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.ADDRESS,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    uuid: UUID_BUSINESS_ADDRESS,
                    updateBody: {
                        address_alias: 'new address alias',
                        street_address_1: 'New Place',
                        street_address_2: 'PO Box New',
                        city: 'New City',
                        state: 'AL',
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/phone', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.PHONE,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    uuid: UUID_BUSINESS_PHONE,
                    updateBody: {
                        phone: '0987654321'
                    }
                }
            }
    
            const jsonBody = JSON.stringify(body);
            const response = await silaAPI({ body: jsonBody });
            const parsedResponse = JSON.parse(response.body);
    
            console.log('parsedResponse: ', parsedResponse);
    
            expect(parsedResponse.success).to.equal(true);
        });
    
        it('should /update/identity', async () => {
            // prepare the request body
            const body = {
                apiPath: SILA_PATHS.UPDATE,
                data: {
                    type: SILA_UPDATE_TYPES.IDENTITY,
                    userHandle: USER_HANDLE_BUSINESS_ONE,
                    uuid: UUID_BUSINESS_IDENTITY,
                    updateBody: {
                        identity_alias: 'EIN',
                        identity_value: '987654321'
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