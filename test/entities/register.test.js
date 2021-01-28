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
} = require('../consts');

describe('tests Sila API integration', () => {
    it('should /register an individual with use of "entity.type"', async () => {
    
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
        console.log('response: ', response);
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
    
    it('should /register an individual with absence of "entity.type"', async () => {
    
    const userInfo = {
        entity: {
            first_name: FIRST_NAME,
            last_name: LAST_NAME,
        }
    }

    const body = {
            apiPath: SILA_PATHS.REGISTER,
            userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
    
    it('should /register a business', async () => {
    
    const userInfo = {
        entity: {
            type: 'business',
            entity_name: ENTITY_NAME,
        }
    }

    const body = {
            apiPath: SILA_PATHS.REGISTER,
            userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});