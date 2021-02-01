// sila
const SILA_BASE_SANDBOX_URL = 'https://sandbox.silamoney.com/0.2';
const SILA_URLS = {
    // entities
    CHECK_HANDLE: `${SILA_BASE_SANDBOX_URL}/check_handle`,
    REGISTER_USER: `${SILA_BASE_SANDBOX_URL}/register`,
    ADD: `${SILA_BASE_SANDBOX_URL}/add/`,
    UPDATE: `${SILA_BASE_SANDBOX_URL}/update/`,
    DELETE: `${SILA_BASE_SANDBOX_URL}/delete/`,
    LINK_BUSINESS_MEMBER: `${SILA_BASE_SANDBOX_URL}/link_business_member`,
    UNLINK_BUSINESS_MEMBER: `${SILA_BASE_SANDBOX_URL}/unlink_business_member`,
    REQUEST_KYC: `${SILA_BASE_SANDBOX_URL}/request_kyc`,
    CHECK_KYC: `${SILA_BASE_SANDBOX_URL}/check_kyc`,
    CERTIFY_BENEFICIAL_OWNER: `${SILA_BASE_SANDBOX_URL}/certify_beneficial_owner`,
    CERTIFY_BUSINESS: `${SILA_BASE_SANDBOX_URL}/certify_business`,
    GET_ENTITIES: `${SILA_BASE_SANDBOX_URL}/get_entities`,
    GET_ENTITY: `${SILA_BASE_SANDBOX_URL}/get_entity`,

    // parameters
    GET_BUSINESS_TYPES: `${SILA_BASE_SANDBOX_URL}/get_business_types`,
    GET_BUSINESS_ROLES: `${SILA_BASE_SANDBOX_URL}/get_business_roles`,
}

module.exports = {
    SILA_URLS
}