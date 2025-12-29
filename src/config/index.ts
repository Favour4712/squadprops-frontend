import { AppConfig, UserSession } from '@stacks/connect';

// Contract details from deployment
export const CONTRACT_ADDRESS = "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR";
export const CONTRACT_NAME = "squadprops";

// Stacks Configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);

// Only instantiate UserSession on the client
export const userSession = typeof window !== 'undefined' 
  ? new UserSession({ appConfig }) 
  : undefined as unknown as UserSession;
