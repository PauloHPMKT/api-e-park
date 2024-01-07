export interface EnvConfig {
  getAppPort: () => number;
  getNodeEnv: () => string;
  getDbHost: () => string;
  getGPTAPIKey: () => string;
  getOrganizationsAPIKey: () => string;
}
