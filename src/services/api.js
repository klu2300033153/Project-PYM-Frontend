const API_BASE_URL = "http://localhost:8086"; // Base URL

const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  CHECK_EMAIL: `${API_BASE_URL}/auth/exists`,
  REGISTER: `${API_BASE_URL}/portfolio/register`,
};

export default API_ROUTES;
