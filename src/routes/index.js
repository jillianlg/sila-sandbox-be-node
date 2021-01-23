// routes
const { register } = require('./entities/register');
const { requestKYC } = require('./entities/requestKYC')
const { checkKYC } = require('./entities/checkKYC')
const { getEntity } = require('./entities/getEntity')
const { update } = require('./entities/update');
const { add } = require('./entities/add');

const SILA_PATHS = {
    REGISTER: 'REGISTER',
    REQUEST_KYC: 'REQUEST_KYC',
    CHECK_KYC: 'CHECK_KYC',
    GET_ENTITY: 'GET_ENTITY',
    UPDATE: 'UPDATE',
    ADD: 'ADD',
}

const SILA_ROUTES = {
    [SILA_PATHS.REGISTER]: register,
    [SILA_PATHS.REQUEST_KYC]: requestKYC,
    [SILA_PATHS.CHECK_KYC]: checkKYC,
    [SILA_PATHS.GET_ENTITY]: getEntity,
    [SILA_PATHS.UPDATE]: update,
    [SILA_PATHS.ADD]: add  
}

module.exports = {
    SILA_ROUTES,
    SILA_PATHS
}