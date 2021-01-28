// routes
const { checkHandle } = require('./entities/checkHandle');
const { register } = require('./entities/register');
const { add } = require('./entities/add');
const { update } = require('./entities/update');
const { deleteUserInfo } = require('./entities/delete');
const { requestKYC } = require('./entities/requestKYC');
const { checkKYC } = require('./entities/checkKYC');
const { getEntities } = require('./entities/getEntities');
const { getEntity } = require('./entities/getEntity');

const SILA_PATHS = {
    CHECK_HANDLE: 'CHECK_HANDLE',
    REGISTER: 'REGISTER',
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    REQUEST_KYC: 'REQUEST_KYC',
    CHECK_KYC: 'CHECK_KYC',
    GET_ENTITIES: 'GET_ENTITIES',
    GET_ENTITY: 'GET_ENTITY',
}

const SILA_ROUTES = {
    [SILA_PATHS.CHECK_HANDLE]: checkHandle,
    [SILA_PATHS.REGISTER]: register,
    [SILA_PATHS.ADD]: add  ,
    [SILA_PATHS.UPDATE]: update,
    [SILA_PATHS.DELETE]: deleteUserInfo,
    [SILA_PATHS.REQUEST_KYC]: requestKYC,
    [SILA_PATHS.CHECK_KYC]: checkKYC,
    [SILA_PATHS.GET_ENTITY]: getEntity,
    [SILA_PATHS.GET_ENTITIES]: getEntities,
}

module.exports = {
    SILA_ROUTES,
    SILA_PATHS
}