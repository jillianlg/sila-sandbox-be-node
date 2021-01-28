// sila
const SILA_BASE_SANDBOX_URL = 'https://sandbox.silamoney.com/0.2';
const SILA_URLS = {
    CHECK_HANDLE: `${SILA_BASE_SANDBOX_URL}/check_handle`,
    REGISTER_USER: `${SILA_BASE_SANDBOX_URL}/register`,
    ADD: `${SILA_BASE_SANDBOX_URL}/add/`,
    UPDATE: `${SILA_BASE_SANDBOX_URL}/update/`,
    DELETE: `${SILA_BASE_SANDBOX_URL}/delete/`,
    REQUEST_KYC: `${SILA_BASE_SANDBOX_URL}/request_kyc`,
    CHECK_KYC: `${SILA_BASE_SANDBOX_URL}/check_kyc`,
    GET_ENTITIES: `${SILA_BASE_SANDBOX_URL}/get_entities`,
    GET_ENTITY: `${SILA_BASE_SANDBOX_URL}/get_entity`,
}

module.exports = {
    SILA_URLS
}