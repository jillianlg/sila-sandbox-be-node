// ROUTES
// entities
const { checkHandle } = require('./entities/checkHandle');
const { register } = require('./entities/register');
const { add } = require('./entities/add');
const { update } = require('./entities/update');
const { deleteUserInfo } = require('./entities/delete');
const { linkBusinessMember } = require('./entities/linkBusinessMember');
const { unlinkBusinessMember } = require('./entities/unlinkBusinessMember');
const { requestKYC } = require('./entities/requestKYC');
const { checkKYC } = require('./entities/checkKYC');
const { certifyBeneficialOwner } = require('./entities/certifyBeneficialOwner');
const { certifyBusiness } = require('./entities/certifyBusiness');
const { getEntities } = require('./entities/getEntities');
const { getEntity } = require('./entities/getEntity');

// accounts
const { linkAccount } = require('./accounts/linkAccount');
const { getAccounts } = require('./accounts/getAccounts');
const { getAccountBalance } = require('./accounts/getAccountBalance');

// parameters
const { getBusinessTypes } = require('./parameters/getBusinessTypes');
const { getBusinessRoles } = require('./parameters/getBusinessRoles');

const SILA_PATHS = {
    // entities
    CHECK_HANDLE: 'CHECK_HANDLE',
    REGISTER: 'REGISTER',
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LINK_BUSINESS_MEMBER: 'LINK_BUSINESS_MEMBER',
    UNLINK_BUSINESS_MEMBER: 'UNLINK_BUSINESS_MEMBER',
    REQUEST_KYC: 'REQUEST_KYC',
    CHECK_KYC: 'CHECK_KYC',
    CERTIFY_BENEFICIAL_OWNER: 'CERTIFY_BENEFICIAL_OWNER',
    CERTIFY_BUSINESS: 'CERTIFY_BUSINESS',
    GET_ENTITIES: 'GET_ENTITIES',
    GET_ENTITY: 'GET_ENTITY',

    // accounts
    LINK_ACCOUNT: 'LINK_ACCOUNT',
    GET_ACCOUNTS: 'GET_ACCOUNTS',
    GET_ACCOUNT_BALANCE: 'GET_ACCOUNT_BALANCE',

    // parameters
    GET_BUSINESS_TYPES: 'GET_BUSINESS_TYPES',
    GET_BUSINESS_ROLES: 'GET_BUSINESS_ROLES',
}

const SILA_ROUTES = {
    // entities
    [SILA_PATHS.CHECK_HANDLE]: checkHandle,
    [SILA_PATHS.REGISTER]: register,
    [SILA_PATHS.ADD]: add  ,
    [SILA_PATHS.UPDATE]: update,
    [SILA_PATHS.DELETE]: deleteUserInfo,
    [SILA_PATHS.LINK_BUSINESS_MEMBER]: linkBusinessMember,
    [SILA_PATHS.UNLINK_BUSINESS_MEMBER]: unlinkBusinessMember,
    [SILA_PATHS.REQUEST_KYC]: requestKYC,
    [SILA_PATHS.CHECK_KYC]: checkKYC,
    [SILA_PATHS.CERTIFY_BENEFICIAL_OWNER]: certifyBeneficialOwner,
    [SILA_PATHS.CERTIFY_BUSINESS]: certifyBusiness,
    [SILA_PATHS.GET_ENTITY]: getEntity,
    [SILA_PATHS.GET_ENTITIES]: getEntities,

    // accounts
    [SILA_PATHS.LINK_ACCOUNT]: linkAccount,
    [SILA_PATHS.GET_ACCOUNTS]: getAccounts,
    [SILA_PATHS.GET_ACCOUNT_BALANCE]: getAccountBalance,

    // parameters
    [SILA_PATHS.GET_BUSINESS_TYPES]: getBusinessTypes,
    [SILA_PATHS.GET_BUSINESS_ROLES]: getBusinessRoles,
}

module.exports = {
    SILA_ROUTES,
    SILA_PATHS
}