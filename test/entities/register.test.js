// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    FIRST_NAME,
    LAST_NAME,
} = require('../consts');

describe('tests Sila API integration', () => {
    it('/register individual', async () => {
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
    
    it('/register business', async () => {
        const businessInfo = {
            entity: {
                entity_name: 'test business',
                business_type: 'corporation',
                naics_code: 721,
                type: 'business',
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