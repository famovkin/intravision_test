const TENANT_GUID = '995bce8c-fed5-43e8-a86d-2785286240f0';
const API_PATH = 'http://intravision-task.test01.intravision.ru/';

const GET_EXECUTORS_URL = `${API_PATH}api/${TENANT_GUID}/Users`;
const GET_PRIORITIES_URL = `${API_PATH}api/${TENANT_GUID}/Priorities`;
const ALL_REQUESTS_URL = `${API_PATH}odata/tasks?tenantguid=${TENANT_GUID}`;
const SINGlE_REQUEST_URL = `${API_PATH}api/${TENANT_GUID}/Tasks/`;
const GET_STATUSES_URL = `${API_PATH}api/${TENANT_GUID}/Statuses`;

export {
  TENANT_GUID,
  API_PATH,
  GET_EXECUTORS_URL,
  GET_PRIORITIES_URL,
  ALL_REQUESTS_URL,
  SINGlE_REQUEST_URL,
  GET_STATUSES_URL,
};
