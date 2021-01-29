// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    FIRST_NAME,
    LAST_NAME,
    ENTITY_NAME,
    BUSINESS_TYPE,
    NAICS_CODE
} = require('../consts');

describe('tests Sila API integration', () => {
    it.skip('should /register an individual with use of "entity.type"', async () => {
    
    const userInfo = {
        entity: {
            type: 'individual',
            first_name: FIRST_NAME,
            last_name: LAST_NAME,
        }
    }

    const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);
        
        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    
    it.skip('should /register an individual with absence of "entity.type"', async () => {
    
    const userInfo = {
        entity: {
            first_name: FIRST_NAME,
            last_name: LAST_NAME,
        }
    }

    const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    
    it.skip('should /register a business', async () => {
    
    const businessInfo = {
        entity: {
            type: 'business',
            entity_name: ENTITY_NAME,
            business_type: BUSINESS_TYPE,
            naics_code: NAICS_CODE,
        }
    }

    const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: businessInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});